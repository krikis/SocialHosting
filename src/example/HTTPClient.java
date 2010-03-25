package example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

public class HTTPClient {

	// Variables for handling http content-length
	public static int content_length = 0;
	public static int byte_count = 0;
	public static boolean body_section = false;

	public static void main(String[] args) throws IOException {

		Socket kkSocket = null;
		PrintWriter out = null;
		BufferedReader in = null;
		String host = "www.google-analytics.com";
		int port = 80;
		String path = "/ga.js";

		try {
			kkSocket = new Socket(host, port);
			out = new PrintWriter(kkSocket.getOutputStream(), true);
			in = new BufferedReader(new InputStreamReader(kkSocket
					.getInputStream()));
		} catch (UnknownHostException e) {
			System.err.println("Don't know about host: " + host + ".");
			System.exit(1);
		} catch (IOException e) {
			System.err.println("Couldn't get I/O for the connection to: "
					+ host + ".");
			System.exit(1);
		}

		BufferedReader stdIn = new BufferedReader(new InputStreamReader(
				System.in));
		String http_response;
		String http_request = "";
		http_request += "GET " + path + " HTTP/1.1\r\n";
		http_request += "Host: " + host + "\r\n";
		http_request += "Connection: keep-alive\r\n";
		http_request += "User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.49 Safari/532.5\r\n";
		http_request += "Cache-Control: max-age=0\r\n";
		http_request += "Accept: application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5\r\n";
		http_request += "Accept-Language: en-US,en;q=0.8\r\n";
		http_request += "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3\r\n";
		http_request += "\r\n";

		// Send http request
		out.println(http_request);

		// Receive http response, wait for server to close connection or quit if
		// body is complete
		while ((http_response = in.readLine()) != null) {
			System.out.println(http_response);
			// quit if body is complete
			if (handle_content_length(http_response)) {
				break;
			}
		}

		out.close();
		in.close();
		stdIn.close();
		kkSocket.close();
	}

	/**
	 * This method handles the transmission of the http response body based on
	 * the content-length if given.
	 * 
	 * @param http_response
	 * @param content_length
	 * @param byte_count
	 * @param body_section
	 * @return
	 */
	private static boolean handle_content_length(String http_response) {
		// Use content-length to collect response body if given.
		if (content_length == 0) {
			try {
				if (http_response.contains("Content-Length: ")) {
					String size = http_response.substring(16);
					content_length = Integer.parseInt(size);
				}
			} catch (Exception e) {
			}
		} else {
			if (body_section) {
				byte_count += (http_response.getBytes().length + 1);
				if (byte_count == content_length) {
					return true;
				}
			} else {
				if (http_response.equals(""))
					body_section = true;
			}

		}
		return false;
	}
}
