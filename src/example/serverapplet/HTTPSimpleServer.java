package example.serverapplet;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URISyntaxException;

public class HTTPSimpleServer {
	private ServerSocket serverSocket;
	private Socket clientSocket;

	public static void main(String[] args) throws IOException {
		new HTTPSimpleServer(4444);
	}

	public HTTPSimpleServer(int port) throws IOException {
		serverSocket = openSocket(port);

		while (true) {
			System.out.println("waiting for connection");
			clientSocket = waitForConnection(serverSocket);
			System.out.println("connection made");

			OutputStream out = clientSocket.getOutputStream();
			BufferedReader in = new BufferedReader(new InputStreamReader(
					clientSocket.getInputStream()));
			String inputLine, outputLine;

			for (int i = 0; (inputLine = in.readLine()) != null; i++) {
				System.out.println(inputLine);
				if (i == 0) {
					String[] splitRequest = inputLine.split("\\s");
					byte[] content;
					if (splitRequest[1].equals("/")) {
						content = readFileAsBytes("static/index.html");
					} else {
						content = readFileAsBytes("static" + splitRequest[1]);
					}
					out.write(content, 0, content.length);
				}
				if (inputLine.equals(""))
					break;
			}

			out.close();
			in.close();
			clientSocket.close();
		}
		// serverSocket.close();
	}

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

	public byte[] readFileAsBytes(String path) {
		File f;
		try {
			// still need to check whether this works with .Jars
			if (this.getClass().getClassLoader().getResource(path) != null) {
				f = new File(this.getClass().getClassLoader().getResource(path)
						.toURI());
			} else {
				f = new File(path);
			}
		} catch (URISyntaxException e1) {
			System.err.println("File URI bad syntax: " + path);
			return new byte[] {};
		}
		// System.out.println("reading: "+ f.getAbsolutePath());

		int length = (int) (f.length());
		if (length == 0) {
			System.err.println("File length is zero: " + path);
		} else {
			FileInputStream fin;
			try {
				fin = new FileInputStream(f);
				DataInputStream in = new DataInputStream(fin);

				byte[] bytecodes = new byte[length];
				in.readFully(bytecodes);
				return bytecodes;
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return new byte[] {};
	}
}
