package server.rmi;

import java.rmi.Naming;
import java.rmi.RMISecurityManager;
import java.rmi.RemoteException;
import java.rmi.server.RemoteServer;
import java.rmi.server.ServerNotActiveException;
import java.rmi.server.UnicastRemoteObject;

import server.Server;

/**
 * This class implements an RMI-server allowing social hosts to register and
 * deregister.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class RMIServer extends UnicastRemoteObject implements
		RMIRemoteRegistration, Runnable {
	// The name of the RMI server
	public static String RMIServerName = "SocialHostingRegistry";

	/**
	 * Constructor generating an {@link RMIServer} object
	 * 
	 * @throws RemoteException
	 */
	public RMIServer() throws RemoteException {
		super();
	}

	public void run() {
		// Create and install a security manager
		if (System.getSecurityManager() == null) {
			System.setSecurityManager(new RMISecurityManager());
		}

		try {
			// Bind RMI server instance
			Naming.rebind(RMIServerName, this);
			System.out.println("RMI Server bound in registry");
		} catch (Exception e) {
			System.out.println("RMI Server error: " + e.getMessage());
			e.printStackTrace();
		}
	}

	public boolean registerSocialHost(int port) throws RemoteException {
		try {
			String host = RemoteServer.getClientHost();
			if (port != 80)
				host += ":" + port;
			// Register the social host
			Server.addSocialHost(host);
			System.out.println("Socialhost registered: " + host);
			return true; // Registration succeeded
		} catch (ServerNotActiveException e) {
			e.printStackTrace();
		}
		return false; // Registration failed
	}

	public boolean deregisterSocialHost(int port) throws RemoteException {
		try {
			String host = RemoteServer.getClientHost();
			if (port != 80)
				host += ":" + port;
			// Deregister the social host
			Server.removeSocialHost(host);
			System.out.println("Socialhost deregistered: " + host);
			return true; // Deregistration succeeded
		} catch (ServerNotActiveException e) {
			e.printStackTrace();
		}
		return false; // Deregistration failed
	}
}
