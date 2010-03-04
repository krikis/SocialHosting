package server.http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

/**
 * This class implements a thread of an HTTP Server. It receives an open socket
 * and handles the HTTP request that is made on it.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class HTTPServerThread extends Thread {
	private Socket socket = null;
	private PrintWriter out;
	private BufferedReader in;

	public HTTPServerThread(Socket socket) {
		super("HTTPServerThread");
		this.socket = socket;
	}

	public void run() {

		HTTPRequest request = readSocket();
		System.out.println(request);

		String outputLine = "Request received.";
		out.println(outputLine);

	}

	/**
	 * Reads the HTTP request from the socket
	 * 
	 * @return an HTTPRequest object
	 */
	private HTTPRequest readSocket() {
		String message = "";
		try {
			out = new PrintWriter(socket.getOutputStream(), true);
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
