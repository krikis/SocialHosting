package server;

import java.rmi.RemoteException;
import java.util.Vector;
import java.util.Random;

import server.http.HTTPServer;
import server.rmi.RMIServer;

/**
 * This class starts up two components: a multiThreaded HTTP Server and an RMI
 * Server. Furthermore it maintains a list of hosts for both servers.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class Server {
	// List of social host IPs
	private static Vector<String> socialHostIPs = new Vector<String>();
	// Random number generator
	private static Random random;

	/**
	 * Adds a social host IP to the list of SocialHostIPs
	 * 
	 * @param socialHost
	 *            the new social host to be added
	 */
	public static void addSocialHost(String socialHost) {
		socialHostIPs.add(socialHost);
	}

	/**
	 * Removes a social host IP from the list of SocialHostIPs
	 * 
	 * @param socialHost
	 *            the social host to be removed
	 */
	public static void removeSocialHost(String socialHost) {
		socialHostIPs.remove(socialHost);
	}

	/**
	 * Returns a random host from the list of social hosts or null if the list
	 * is emtpy.
	 * 
	 * @return a random host from the list of social hosts
	 */
	public static String randomHost() {
		if (socialHostIPs.size() > 0) {
			int index = random.nextInt(socialHostIPs.size());
			return socialHostIPs.elementAt(index);
		} else {
			return null;
		}
	}

	/**
	 * This main method starts up the HTTP Server and the RMI Server
	 * 
	 * @param args
	 *            the port on which the HTTP Server has to listen. Defaults to
	 *            4444.
	 */
	public static void main(String[] args) {
		// Create random number generator
		random = new Random(8750212);
		// Read and validate port
		int port = -1;
		try {
			port = Integer.parseInt(args[0]);
		} catch (NumberFormatException e) {
		}
		if (port != 80 && (port < 1024 || port > 49151)) {
			System.err.println("Port " + port + " is no valid user port.");
			System.err
					.println("Provide either 80 or a number between 1024 and 49151.");
			System.exit(-1);
		}
		// Start HTTP Server
		HTTPServer httpServer = new HTTPServer(port);
		httpServer.start();
		// Start RMI Server
		try {
			RMIServer rmiServer = new RMIServer();
			rmiServer.run();
		} catch (RemoteException e) {
			System.err.println("RMI Server could not be started!");
			e.printStackTrace();
		}
	}

}
