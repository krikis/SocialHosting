package server.http;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;
import java.net.URISyntaxException;

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

	public HTTPServerThread(Socket socket) {
		super("HTTPServerThread");
		this.socket = socket;
	}

	/*
	 * (non-Javadoc) Reads the request from the socket, opens the requested
	 * file, compiles a response header and sends the response
	 * 
	 * @see java.lang.Thread#run()
	 */
	public void run() {
		// read the request from the socket
		HTTPRequest request = readSocket();
		System.out.println(request);
		// open the requested file
		FileHandler file = new FileHandler(request.path());
		// read as bytes
		byte[] content = file.readAsBytes();
		// compile the response header
		HTTPResponse response = new HTTPResponse(file.serverStatus(), file
				.mimeType(), Integer.toString(content.length));
		System.out.println(response);
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
