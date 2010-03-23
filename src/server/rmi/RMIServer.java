package server.rmi;

import java.rmi.Naming;
import java.rmi.RMISecurityManager;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.RemoteServer;
import java.rmi.server.ServerNotActiveException;
import java.rmi.server.UnicastRemoteObject;
import java.util.Vector;

public class RMIServer extends UnicastRemoteObject implements
		RMIRemoteRegistration {

	public static String RMIServerName = "SocialHostingRegistry";

	Vector<String> socialHostIPs = new Vector<String>();

	public RMIServer() throws RemoteException {
		super();
	}

	public boolean registerSocialHost(int port) throws RemoteException {
		try {
			String host = RemoteServer.getClientHost();
			if (port != 80)
				host += ":" + port;
			socialHostIPs.add(host);
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
			socialHostIPs.remove(host);
			System.out.println("Socialhost deregistered: " + host);
			return true; // Deregistration succeeded
		} catch (ServerNotActiveException e) {
			e.printStackTrace();
		}
		return false; // Deregistration failed
	}

	public static void main(String[] args) {
		// Create and install a security manager
		if (System.getSecurityManager() == null) {
			System.setSecurityManager(new RMISecurityManager());
		}

		try {
			RMIServer server = new RMIServer();
			// Bind RMI server instance
			Naming.rebind(RMIServerName, server);
			System.out.println("RMI Server bound in registry");
		} catch (Exception e) {
			System.out.println("RMI Server error: " + e.getMessage());
			e.printStackTrace();
		}
	}
}
