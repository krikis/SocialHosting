package example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class HTTPSimpleServer {
	public static void main(String[] args) throws IOException {

		ServerSocket serverSocket = null;
		int port = 4444;
		try {
			serverSocket = new ServerSocket(port);
		} catch (IOException e) {
			System.err.println("Could not listen on port: " + port + ".");
			System.exit(1);
		}

		Socket clientSocket = null;
		try {
			clientSocket = serverSocket.accept();
		} catch (IOException e) {
			System.err.println("Accept failed.");
			System.exit(1);
		}

		PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
		BufferedReader in = new BufferedReader(new InputStreamReader(
				clientSocket.getInputStream()));
		String inputLine, outputLine;

		while ((inputLine = in.readLine()) != null) {
			System.out.println(inputLine);
			if (inputLine.equals(""))
				break;
		}
		out.println("Request processed.");
		out.close();
		in.close();
		clientSocket.close();
		serverSocket.close();
	}
}