package applet.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;

import applet.ServerApplet;

/**
 * This class implements a thread of an HTTP Server. It receives an open socket
 * and handles the HTTP request that is made on it.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class HTTPServerThread extends Thread {
	private Socket socket = null;
	private OutputStream out;
	private BufferedReader in;
	private ServerApplet applet;

	public HTTPServerThread(ServerApplet log, Socket socket) {
		super("HTTPServerThread");
		applet = log;
		this.socket = socket;
	}

	public void run() {
		// read the request from the socket
		HTTPRequest request = readSocket();
		applet.log(request.toString());
		// open the requested file
		FileHandler file = new FileHandler(applet, request.path());
		// read as bytes
		byte[] content = file.readAsBytes();
		// compile the response header
		HTTPResponse response = new HTTPResponse(file.serverStatus(), file
				.mimeType(), Integer.toString(content.length));
		applet.log(response.toString());
		// send the response as bytes
		try {
			out.write(response.header().getBytes());
			out.write(content);
		} catch (IOException e) {
			e.printStackTrace();
		}
		closeSocket();
	}

	/**
	 * Reads the HTTP request from the socket
	 * 
	 * @return an HTTPRequest object
	 */
	private HTTPRequest readSocket() {
		String message = "";
		try {
			out = socket.getOutputStream();
			in = new BufferedReader(new InputStreamReader(socket
					.getInputStream()));
			String inputLine;

			while ((inputLine = in.readLine()) != null) {
				message += inputLine + "\n";
				if (inputLine.equals(""))
					break;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return new HTTPRequest(message);
	}

	/**
	 * Closes the socket
	 */
	private void closeSocket() {
		try {
			out.close();
			in.close();
			socket.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
