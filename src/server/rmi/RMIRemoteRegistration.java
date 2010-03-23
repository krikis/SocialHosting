package server.rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface RMIRemoteRegistration extends Remote {

	public boolean registerSocialHost(int port) throws RemoteException;

	public boolean deregisterSocialHost(int port) throws RemoteException;
}
