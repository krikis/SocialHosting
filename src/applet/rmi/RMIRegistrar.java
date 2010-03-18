package applet.rmi;

import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.UnmarshalException;

import applet.ServerApplet;

import server.rmi.RMIRemoteRegistration;

public class RMIRegistrar extends Thread {

	// The remote register where we subscribe as host
	private RMIRemoteRegistration register = null;
	// The running applet
	private ServerApplet applet;

	public RMIRegistrar(ServerApplet log) {
		applet = log;
	}

	public void run() {
		applet.log("test");
		testRMI();
		applet.log("test");
	}

	public void testRMI() {

		// String message = "test";
		//
		// // "obj" is the identifier that we'll use to refer
		// // to the remote object that implements the "Hello"
		// // interface
		// Hello obj = null;
		// try {
		// obj = (Hello) Naming.lookup("//" + applet.getCodeBase().getHost()
		// + "/HelloServer");
		// message = obj.sayHello();
		// } catch (Exception e) {
		// applet.reportError(e);
		// }
		// applet.log(message);
		try {
			register = (RMIRemoteRegistration) Naming
					.lookup("//" + applet.getCodeBase().getHost()
							+ "/SocialHostingRegistry");

			register.registerSocialHost();
			applet.log("success");
		} catch (Exception e) {
			applet.reportError(e);
		}
	}

	// public static String registryAddress = "localhost";
	// private RMIRemoteRegistration RMIregistrationStub;
	//	
	// public void registerSocialhost(){
	// Registry registry;
	// try {
	// registry = LocateRegistry.getRegistry(registryAddress);
	//
	// RMIregistrationStub = (RMIRemoteRegistration)
	// registry.lookup(RMIServer.RMIServerName);
	// if(RMIregistrationStub.registerSocialHost()){
	// System.out.println("Socialhost registration successful");
	// return;
	// }
	// } catch (RemoteException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// } catch (NotBoundException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }
	// System.err.println("Socialhost registration failed");
	// }
	//	
	// public void deregisterSocialhost(){
	// try {
	// if(RMIregistrationStub.deregisterSocialHost()){
	// System.out.println("Socialhost deregistration successful");
	// return;
	// }
	// } catch (RemoteException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }
	// System.err.println("Socialhost deregistration failed");
	// }

}
