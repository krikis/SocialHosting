package server.rmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * This interface provides remote methods for registering and deregistering
 * social hosts
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public interface RMIRemoteRegistration extends Remote {

	/**
	 * Registers a social host to the main server
	 * 
	 * @param port
	 *            the port the social host listens to
	 * @return whether the registration process completed successfully
	 * @throws RemoteException
	 */
	public boolean registerSocialHost(int port) throws RemoteException;

	/**
	 * Deregisters a social host to the main server
	 * 
	 * @param port
	 *            the port the social host listens to
	 * @return whether the deregistration process completed successfully
	 * @throws RemoteException
	 */
	public boolean deregisterSocialHost(int port) throws RemoteException;
}
