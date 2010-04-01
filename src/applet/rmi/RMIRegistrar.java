package applet.rmi;

import java.rmi.Naming;

import server.rmi.RMIRemoteRegistration;
import applet.ServerApplet;

/**
 * This class implements an RMI-client running in a Java thread.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class RMIRegistrar {

	// The remote register where social hosts are subscribed
	private RMIRemoteRegistration register = null;
	// The running applet
	private ServerApplet applet;

	/**
	 * Constructor creating an {@link RMIRegistrar} object. The Applet this
	 * thread runs in is passed as an argument to make callbacks for logging
	 * possible.
	 * 
	 * @param log
	 *            the Applet instance to write logs to
	 */
	public RMIRegistrar(ServerApplet log) {
		applet = log;
	}

	/**
	 * This method makes an RMI call to a remote RMI-server in order to register
	 * a social host. The method returns true when registration succeeds.
	 * 
	 * @param port
	 *            the port on which the social hosts hosting service resides
	 * 
	 * @return whether the registration of the social host succeeded
	 */
	public boolean registerSocialHost(int port) {
		try {
			// Query for RMI-server
			register = (RMIRemoteRegistration) Naming
					.lookup("//" + applet.getCodeBase().getHost()
							+ "/SocialHostingRegistry");
			// Make RMI call
			boolean success = register.registerSocialHost(port);
			if (!success)
				return false;
			applet.log("Social host registered.");
		} catch (Exception e) {
			applet.reportError(e);
			return false;
		}
		return true;
	}

	/**
	 * This method makes an RMI call to a remote RMI-server in order to
	 * deregister a social host. The method returns true when deregistration
	 * succeeds.
	 * 
	 * @param port
	 *            the port on which the social hosts hosting service resides
	 * 
	 * @return whether the deregistration of the social host succeeded
	 */
	public boolean deregisterSocialHost(int port) {
		try {
			// Query for RMI-server
			register = (RMIRemoteRegistration) Naming
					.lookup("//" + applet.getCodeBase().getHost()
							+ "/SocialHostingRegistry");
			// Make RMI call
			boolean success = register.deregisterSocialHost(port);
			if (!success)
				return false;
			applet.log("Social host deregistered.");
		} catch (Exception e) {
			applet.reportError(e);
			return false;
		}
		return true;
	}

}
