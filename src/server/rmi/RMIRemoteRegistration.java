package applet.server;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface RMIRemoteRegistration extends Remote {
	public boolean registerSocialHost() throws RemoteException;
	public boolean deregisterSocialHost() throws RemoteException;
}
