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

	RMIServer() throws RemoteException {
		super();
	}

	public boolean registerSocialHost() throws RemoteException {
		try {
			socialHostIPs.add(RemoteServer.getClientHost());
			System.out.println("Socialhost registered: "
					+ RemoteServer.getClientHost());
			// Registration succeeded
			return true;
		} catch (ServerNotActiveException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// Registration failed
		return false;
	}

	public boolean deregisterSocialHost() throws RemoteException {
		try {
			socialHostIPs.remove(RemoteServer.getClientHost());
			System.out.println("Socialhost deregistered: "
					+ RemoteServer.getClientHost());
			// Deregistration succeeded
			return true;
		} catch (ServerNotActiveException e) {
			e.printStackTrace();
		}
		// Deregistration failed
		return false;
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
			System.out.println("RMI server bound in registry");
		} catch (Exception e) {
			System.out.println("RMI server error: " + e.getMessage());
			e.printStackTrace();
		}
	}
}
