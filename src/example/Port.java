package example;

// Copyright (C) Bill Clagett 1997.

import java.net.*;
import java.io.IOException;

/**
 * Representation of a specific port on a specific machine
 * 
 * @author Bill Clagett (bill.clagett@sitesonthe.net)
 * @version %I%, %G%
 */
class Port {
	InetAddress _host = null;
	int _port = -1;

	Port(InetAddress host, int port) {
		_host = host;
		_port = port;
	}

	/**
	 * Trys to connection to the port. If it succeeds, a message is printed to
	 * System.out.
	 */
	void scan() {
		System.out.println("trying " + _host + ":" + _port);
		try {
			Socket s = new Socket(_host, _port);
			System.out.println("\t\t Yes, there is a listener on " + _host
					+ ":" + _port + "!");
			s.close();
		}
		// Begin JDK 1.0 version
		catch (SocketException e) {
		}
		// End JDK 1.0 version
		catch (IOException e) {
			System.out.println(e + " while trying" + _host + ":" + _port);
		}
	}
}
