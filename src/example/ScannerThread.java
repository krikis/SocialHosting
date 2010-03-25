package example;

// Copyright (C) Bill Clagett 1997.

class ScannerThread extends Thread implements Runnable {
	PortFactory _ports = null;

	public ScannerThread(PortFactory ports) {
		_ports = ports;
	}

	public void run() {
		Port port = null;
		boolean quit = false;

		while (!quit) {
			port = null;
			synchronized (_ports) {
				if (!_ports.hasMoreElements()) {
					quit = true;
					return;
				}
				port = (Port) _ports.nextElement();
			}
			if (null != port)
				port.scan();
		}
	}
}
