package applet.server;

import applet.*;
import applet.rmi.RMIRegistrar;

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
	private boolean listening = true;
	private ServerSocket serverSocket = null;
	private int port;
	private ServerApplet applet;

	/**
	 * Creates a new {@link HTTPServer} object
	 */
	public HTTPServer(ServerApplet log) {
		port = 5555;
		applet = log;
	}

	/**
	 * Starts the HTTP server
	 */
	public void run() {
		// Try to open socket on given port
		try {
			serverSocket = new ServerSocket(port);
			applet.log("Starting HTTP server on port " + port + "...");
			// TODO: do rmi request here
			RMIRegistrar registrar = new RMIRegistrar(applet);
			registrar.start();
			applet.setServerStarted();
			applet.log("HTTP Server successfully started!");
		} catch (IOException e) {
			applet.log("Could not listen on port: " + port + ".");
			applet.setServerStopped();
			return;
		}

		// Start a thread when someone connects to the socket
		try {
			while (listening)
				new HTTPServerThread(applet, serverSocket.accept()).start();
		} catch (IOException e) {
			applet.setServerStopped();
			applet.log("HTTP Server successfully halted!");
		}

		// Close the socket when the server is stopped
		stopServer();
	}

	/**
	 * Stops the HTTP server
	 */
	public void stopServer() {
		listening = false;
		if (!serverSocket.isClosed()) {
			applet.log("Stopping HTTP server on port " + port + "...");
			try {
				serverSocket.close();
			} catch (IOException e) {
				applet.log("Could not close connection on port: " + port + ".");
			}
		}
	}
}
