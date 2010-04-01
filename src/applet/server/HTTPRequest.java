package applet.server;

import java.util.StringTokenizer;

/**
 * This class implements an HTTP 1.1 request header
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class HTTPRequest {
	// String containing the plain header
	private String plainHeader;
	// String containing the request method
	private String method;
	// String containing the path of the requested file
	private String path;

	/**
	 * This constructor returns an {@link HTTPRequest} object with the path
	 * attribute set given an HTTP-request in plain-text
	 * 
	 * @param request
	 *            an HTTP-request in plain-text
	 */
	public HTTPRequest(String request) {
		plainHeader = request;
		StringTokenizer tokenizer = new StringTokenizer(request);
		method = tokenizer.nextToken();
		path = tokenizer.nextToken();
	}

	/**
	 * Returns the requests method
	 * 
	 * @return the requests method
	 */
	public String method() {
		return method;
	}

	/**
	 * Returns the request files path
	 * 
	 * @return the request files path
	 */
	public String path() {
		return path;
	}

	public String toString() {
		return plainHeader;
	}
}
