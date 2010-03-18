/*
 * Copyright 2002 Sun Microsystems, Inc. All  Rights Reserved.
 *  
 * Redistribution and use in source and binary forms, with or 
 * without modification, are permitted provided that the following 
 * conditions are met:
 * 
 * -Redistributions of source code must retain the above copyright  
 *  notice, this list of conditions and the following disclaimer.
 * 
 * -Redistribution in binary form must reproduce the above copyright 
 *  notice, this list of conditions and the following disclaimer in 
 *  the documentation and/or other materials provided with the 
 *  distribution.
 *  
 * Neither the name of Sun Microsystems, Inc. or the names of 
 * contributors may be used to endorse or promote products derived 
 * from this software without specific prior written permission.
 * 
 * This software is provided "AS IS," without a warranty of any 
 * kind. ALL EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND 
 * WARRANTIES, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT, ARE HEREBY 
 * EXCLUDED. SUN AND ITS LICENSORS SHALL NOT BE LIABLE FOR ANY 
 * DAMAGES OR LIABILITIES  SUFFERED BY LICENSEE AS A RESULT OF OR 
 * RELATING TO USE, MODIFICATION OR DISTRIBUTION OF THE SOFTWARE OR 
 * ITS DERIVATIVES. IN NO EVENT WILL SUN OR ITS LICENSORS BE LIABLE 
 * FOR ANY LOST REVENUE, PROFIT OR DATA, OR FOR DIRECT, INDIRECT, 
 * SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER 
 * CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT OF 
 * THE USE OF OR INABILITY TO USE SOFTWARE, EVEN IF SUN HAS BEEN 
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 *  
 * You acknowledge that Software is not designed, licensed or 
 * intended for use in the design, construction, operation or 
 * maintenance of any nuclear facility. 
 */

package example.rmi_server_applet;

import java.applet.Applet;
import java.awt.Graphics;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.rmi.Naming;
import java.rmi.RemoteException;

public class HelloApplet extends Applet {

	String message = "blank";

	private ServerSocket serverSocket;
	private Socket clientSocket;
	int port = 4444;

	ServerSocket openSocket(int port) {
		try {
			return new ServerSocket(port);
		} catch (IOException e) {
			System.err.println("Could not listen on port: " + port + ".");
			System.exit(1);
			return null;
		}
	}

	Socket waitForConnection(ServerSocket socket) {
		try {
			return socket.accept();
		} catch (IOException e) {
			System.err.println("Accept failed.");
			System.exit(1);
			return null;
		}
	}

	// "obj" is the identifier that we'll use to refer
	// to the remote object that implements the "Hello"
	// interface
	Hello obj = null;

	public void init() {
		try {
			obj = (Hello) Naming.lookup("//" + getCodeBase().getHost()
					+ "/HelloServer");
			message = obj.sayHello();
		} catch (Exception e) {
			System.out.println("HelloApplet exception: " + e.getMessage());
			e.printStackTrace();
		}
		try {
			serverSocket = openSocket(port);
			System.out.println("waiting for connection");
			message += "\n\nwaiting for connection\n";
			clientSocket = waitForConnection(serverSocket);
			System.out.println("connection made");
			message += "connection made\n";

			PrintWriter out = new PrintWriter(clientSocket.getOutputStream(),
					true);
			BufferedReader in = new BufferedReader(new InputStreamReader(
					clientSocket.getInputStream()));
			String inputLine, outputLine;

			while ((inputLine = in.readLine()) != null) {
				System.out.println(inputLine);
				message += inputLine + "\n";
				if (inputLine.equals(""))
					break;
			}

			outputLine = "Request received.";
			out.println(outputLine);
			out.close();
			in.close();
			clientSocket.close();
			serverSocket.close();
		} catch (IOException e) {
			System.out.println("IOEcxeption");
		}
	}

	public void paint(Graphics g) {
		g.drawString(message, 25, 50);
	}
}
