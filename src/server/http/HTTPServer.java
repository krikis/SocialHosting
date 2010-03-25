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
public class HTTPServer extends Thread {

	private ServerSocket serverSocket = null;
	private int port;
	private boolean listening = true;

	/**
	 * Creates a new {@link HTTPServer} object
	 */
	public HTTPServer(int serverPort) {
		port = serverPort;
	}

	/**
	 * Starts the HTTP server
	 */
	public void run() {
		// Try to open socket on given port
		try {
			serverSocket = new ServerSocket(port);
			System.out.println("HTTP Server started on port " + port + ".");
		} catch (IOException e) {
			System.err.println("Could not listen on port: " + port + ".");
			return;
		}

		// Start a thread when someone connects to the socket
		try {
			while (listening)
				new HTTPServerThread(serverSocket.accept()).start();
		} catch (IOException e) {
			System.err.println("Sever halted.");
		}

		// Close the socket
		try {
			serverSocket.close();
		} catch (IOException e) {
			System.err.println("Could not close connection on port: " + port
					+ ".");
		}
	}
}
