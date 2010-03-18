package server.http;

import java.util.Date;
import java.util.TimeZone;

/**
 * This class implements an HTTP response header. Given the right settings it
 * generates an HTTP/1.1 compliant response header.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class HTTPResponse {
	// possible http response codes
	public static final String OK = "200 OK";
	public static final String NOT_FOUND = "404 Not Found";
	// contains possible content types
	public static final String JAR_MIME = "application/x-java-archive";
	public static final String JNLP_MIME = "application/x-java-jnlp-file";
	public static final String CLASS_MIME = "application/java-vm";
	public static final String HTML_MIME = "text/html";
	// the fully compiled header
	private String header;
	// defines http protocol version
	private String protocol = "HTTP/1.1";
	// defines the http response code
	private String responseCode;
	// contains the current date
	private String date;
	// specifies the content length
	private String contentLength;
	// specifies the server name
	private String server = "Java Strange Brew v1.0.0";
	// specifies the reponse content type
	private String contentType;

	/**
	 * Creates a {@link HTTPResponse} object with a compiled header
	 * corresponding the given parameters
	 * 
	 * @param code
	 *            the response code for the HTTP response header
	 * @param type
	 *            the content type for the HTTP reponse body
	 * @param length
	 *            the length of the HTTP resonse body
	 */
	public HTTPResponse(String code, String type, String length) {
		responseCode = code;
		contentType = type;
		contentLength = length;
		date = forgeDateDueToEmptyJava();
		compile();
	}

	/**
	 * Returns the compiled HTTP response header
	 * 
	 * @return the compiled HTTP response header
	 */
	public String header() {
		return header;
	}

	/**
	 * Forges a string containing the current date in RFC 1123 format
	 * 
	 * @return string containing formatted date complying RFC 1123
	 */
	private String forgeDateDueToEmptyJava() {
		Date date = new Date();
		java.text.DateFormat formatter = new java.text.SimpleDateFormat(
				"EEE, dd MMM yyyy HH:mm:ss zzz", java.util.Locale.US);
		formatter.setTimeZone(TimeZone.getTimeZone("GMT"));
		String formattedDate = formatter.format(date);
		return formattedDate;
	}

	/**
	 * Compiles the HTTP response header given the right settings.
	 */
	private void compile() {
		header = protocol + " " + responseCode + "\n";
		header += "Date: " + date + "\n";
		header += "Server: " + server + "\n";
		header += "Content-Type: " + contentType + "\n";
		header += "Content-Length: " + contentLength + "\n";
		header += "\n";
	}

	public String toString() {
		return header;
	}

}
