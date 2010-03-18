package applet.server;

import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class RMITestClient {
	public static void main(String[] args) {
		Registry registry;
		try {
			registry = LocateRegistry.getRegistry();

			RMIRemoteRegistration server = (RMIRemoteRegistration) registry
					.lookup(RMIServer.RMIServerName);
			System.out.println("RMI server returned "
					+ server.registerSocialHost());
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NotBoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
