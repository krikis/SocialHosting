package applet.rmi;

import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.UnmarshalException;

import applet.ServerApplet;

import server.rmi.RMIRemoteRegistration;

public class RMIRegistrar {

	// The remote register where we subscribe as host
	private RMIRemoteRegistration register = null;
	// The running applet
	private ServerApplet applet;

	public RMIRegistrar(ServerApplet log) {
		applet = log;
	}

	public void registerSocialHost(int port) {

		try {
			register = (RMIRemoteRegistration) Naming
					.lookup("//" + applet.getCodeBase().getHost()
							+ "/SocialHostingRegistry");

			register.registerSocialHost(port);
			applet.log("Social host registered!");
		} catch (Exception e) {
			applet.reportError(e);
		}
	}

	public void deregisterSocialHost(int port) {

		try {
			register = (RMIRemoteRegistration) Naming
					.lookup("//" + applet.getCodeBase().getHost()
							+ "/SocialHostingRegistry");

			register.deregisterSocialHost(port);
			applet.log("Social host deregistered!");
		} catch (Exception e) {
			applet.reportError(e);
		}
	}

}
