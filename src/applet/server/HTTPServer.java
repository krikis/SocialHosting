package applet.server;

import java.io.IOException;
import java.net.ServerSocket;

import applet.ServerApplet;
import applet.rmi.RMIRegistrar;

/**
 * This class implements a MultiThreaded HTTP Server. For every connection made
 * on the socket a new thread is fired up handling the HTTP request. The served
 * files are read from the applet jarfile.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class HTTPServer extends Thread {
	private boolean listening = true;
	private ServerSocket serverSocket = null;
	private String portnr;
	private int port = 0;
	private ServerApplet applet;
	private RMIRegistrar registrar;

	/**
	 * Creates a new {@link HTTPServer} object
	 */
	public HTTPServer(ServerApplet log, String server_port) {
		portnr = server_port;
		applet = log;
		registrar = new RMIRegistrar(log);
	}

	/**
	 * Starts the HTTP server when a valid port is given
	 */
	public void run() {
		// Check whether port is valid
		try {
			port = Integer.parseInt(portnr);
		} catch (Exception e) {
		}
		if (port != 80 && (port < 1024 || port > 49151)) {
			applet.log("Invalid port number!");
			applet
					.log("Provide either 80 or a number between 1024 and 49151.\n");
			applet.setServerStopped();
		} else {
			// Start the server
			startServer();
		}
	}

	// Starts the HTTP server
	private void startServer() {
		// Try to open socket on given port
		try {
			serverSocket = new ServerSocket(port);
			applet.log("Starting HTTP server on port " + port + "...");
			// RMI request to register host
			registrar.registerSocialHost(port);
			applet.setServerStarted();
			applet.log("HTTP Server successfully started!\n");
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
			applet.log("HTTP Server successfully halted!\n");
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
			// RMI request to deregister host
			registrar.deregisterSocialHost(port);
			applet.log("Stopping HTTP server on port " + port + "...");
			try {
				serverSocket.close();
			} catch (IOException e) {
				applet.log("Could not close connection on port: " + port + ".");
			}
		}
	}
}
