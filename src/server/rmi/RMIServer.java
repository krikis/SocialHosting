package applet.server;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.RemoteServer;
import java.rmi.server.ServerNotActiveException;
import java.rmi.server.UnicastRemoteObject;
import java.util.Vector;


public class RMIServer implements RMIRemoteRegistration{
	
	public static String RMIServerName = "SocialhostingRegistry";
	
	Vector<String> socialHostIPs = new Vector<String>();
	
	public static void main(String[] args){		
		RMIServer server = new RMIServer();
		
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        
		while(server.socialHostIPs.isEmpty()){
			try {
				Thread.sleep(1000);				
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
	
	RMIServer(){
		try {
			RMIRemoteRegistration stub = (RMIRemoteRegistration) UnicastRemoteObject.exportObject(this, 0);
            Registry registry = LocateRegistry.getRegistry();
            registry.rebind(RMIServerName, stub);
		} catch (RemoteException e) {
			System.err.println("Failed to create or bind RMI");
			e.printStackTrace();
		}
	}
	
	@Override
	public boolean registerSocialHost() throws RemoteException{
		try {
			socialHostIPs.add(RemoteServer.getClientHost());
			System.out.println("Socialhost registered: " + RemoteServer.getClientHost());
			//Registration succeeded
			return true;
		} catch (ServerNotActiveException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		//Registration failed
		return false;
	}

	@Override
	public boolean deregisterSocialHost() throws RemoteException {
		try {
			socialHostIPs.remove(RemoteServer.getClientHost());
			System.out.println("Socialhost deregistered: " + RemoteServer.getClientHost());
			//Deregistration succeeded
			return true;
		} catch (ServerNotActiveException e) {
			e.printStackTrace();
		}
		//Deregistration failed
		return false;
	}
}
