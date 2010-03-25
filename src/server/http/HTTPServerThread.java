package server.http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;

import server.Server;

/**
 * This class implements a thread of an HTTP Server. It receives an open socket
 * and handles the HTTP request that is made on it.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class HTTPServerThread extends Thread {
	private Socket socket = null;
	private OutputStream out;
	private BufferedReader in;

	/**
	 * Creates a new {@link HTTPServerThread} handling a request on the given
	 * socket
	 * 
	 * @param socket
	 *            the socket containing a request
	 */
	public HTTPServerThread(Socket socket) {
		super("HTTPServerThread");
		this.socket = socket;
	}

	/*
	 * (non-Javadoc) Reads the request from the socket, handles it, compiles a
	 * response header and sends the response
	 * 
	 * @see java.lang.Thread#run()
	 */
	public void run() {
		// read the request from the socket
		HTTPRequest request = readSocket();
		System.out.println(request);
		// create new response header
		HTTPResponse response = new HTTPResponse();
		// handle the request
		byte[] content = handleRequest(request, response);
		System.out.println(response);
		// send the response as bytes
		try {
			out.write(response.header().getBytes());
			out.write(content);
		} catch (IOException e) {
			e.printStackTrace();
		}
		closeSocket();
	}

	// Reads the HTTP request from the socket
	private HTTPRequest readSocket() {
		String message = "";
		try {
			out = socket.getOutputStream();
			in = new BufferedReader(new InputStreamReader(socket
					.getInputStream()));
			String inputLine;

			while ((inputLine = in.readLine()) != null) {
				message += inputLine + "\n";
				if (inputLine.equals(""))
					break;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return new HTTPRequest(message);
	}

	private byte[] handleRequest(HTTPRequest request, HTTPResponse response) {
		String socialHost = Server.randomHost();
		byte[] content = null;
		if (socialHost != null) {
			// compile destination
			String destination = "http://" + socialHost + request.path();
			// set redirect content
			String body = "<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">\n";
			body += "<html><head>\n";
			body += "<title>302 Found</title>\n";
			body += "</head><body>\n";
			body += "<h1>Found</h1>\n";
			body += "<p>The document has moved <a href=\"http://" + destination + "\">here</a>.</p>\n";
			body += "</body></html>\n";
			body += "\n";
			content = body.getBytes();
			// setup redirect response
			response.setResponseCode(HTTPResponse.REDIRECT);
			response.setContentType(HTTPResponse.HTML_MIME);
			response.setContentLength(Integer.toString(content.length));
			response.setLocation(destination);
		} else {
			// open the requested file
			FileHandler file = new FileHandler(request.path());
			// read as bytes
			content = file.readAsBytes();
			// setup the response header
			response.setResponseCode(file.serverStatus());
			response.setContentType(file.mimeType());
			response.setContentLength(Integer.toString(content.length));
		}
		return content;
	}

	// Closes the socket
	private void closeSocket() {
		try {
			out.close();
			in.close();
			socket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
