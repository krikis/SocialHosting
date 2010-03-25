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
	public static final String REDIRECT = "302 Found";
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
	// specifies a redirects destination
	private String location;

	/**
	 * Creates an empty {@link HTTPResponse} object
	 */
	public HTTPResponse() {

	}

	/**
	 * Sets the response code of the HTTP response
	 * 
	 * @param code
	 *            the response code of the HTTP response
	 */
	public void setResponseCode(String code) {
		responseCode = code;
		header = null;
	}

	/**
	 * Sets the content type of the HTTP response
	 * 
	 * @param type
	 *            the content type of the HTTP response
	 */
	public void setContentType(String type) {
		contentType = type;
		header = null;
	}

	/**
	 * Sets the content length of the HTTP response
	 * 
	 * @param type
	 *            the content length of the HTTP response
	 */
	public void setContentLength(String length) {
		contentLength = length;
		header = null;
	}

	/**
	 * Sets the location of an HTTP redirect response
	 * 
	 * @param type
	 *            the location of an HTTP redirect response
	 */
	public void setLocation(String destination) {
		location = destination;
		header = null;
	}

	/**
	 * Returns the compiled HTTP response header
	 * 
	 * @return the compiled HTTP response header
	 */
	public String header() {
		if (header == null) {
			compile();
		}
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
		header += "Date: " + forgeDateDueToEmptyJava() + "\n";
		header += "Server: " + server + "\n";
		if (responseCode == REDIRECT)
			header += "Location: " + location + "\n";
		header += "Content-Type: " + contentType + "\n";
		header += "Content-Length: " + contentLength + "\n";
		header += "\n";
	}

	public String toString() {
		return header();
	}

}
