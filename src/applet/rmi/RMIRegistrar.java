package applet.rmi;

import java.rmi.Naming;

import server.rmi.RMIRemoteRegistration;
import applet.ServerApplet;

public class RMIRegistrar {

	// The remote register where we subscribe as host
	private RMIRemoteRegistration register = null;
	// The running applet
	private ServerApplet applet;

	public RMIRegistrar(ServerApplet log) {
		applet = log;
	}

	public boolean registerSocialHost(int port) {

		try {
			register = (RMIRemoteRegistration) Naming
					.lookup("//" + applet.getCodeBase().getHost()
							+ "/SocialHostingRegistry");

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

	public boolean deregisterSocialHost(int port) {

		try {
			register = (RMIRemoteRegistration) Naming
					.lookup("//" + applet.getCodeBase().getHost()
							+ "/SocialHostingRegistry");

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
