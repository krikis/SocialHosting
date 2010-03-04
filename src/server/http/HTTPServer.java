package server.http;

import java.io.IOException;
import java.net.ServerSocket;

/**
 * This class implements a MultiThreaded HTTP Server. For every connection made
 * on the socket a new thread is fired up handling the HTTP request.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class HTTPServer {
	public static void main(String[] args) throws IOException {
		ServerSocket serverSocket = null;
		int port = 4444;
		boolean listening = true;

		// Try to open socket on given port
		try {
			serverSocket = new ServerSocket(port);
		} catch (IOException e) {
			System.err.println("Could not listen on port: " + port + ".");
			System.exit(1);
		}

		// Start a thread when someone connects to the socket
		while (listening)
			new HTTPServerThread(serverSocket.accept()).start();

		serverSocket.close();
	}
}
