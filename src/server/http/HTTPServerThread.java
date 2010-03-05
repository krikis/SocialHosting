package server.http;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
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

	public void run() {
		HTTPRequest request = readSocket();
		System.out.println(request);

		byte[] content;
        if(request.path().equals("/")){
            content = readFileAsBytes("static/index.html");
        } else {
            content = readFileAsBytes("static"+request.path());
        }
        
		try {
		    out.write(content);
        } catch (IOException e) {
            e.printStackTrace();
        }
        closeSocket();
	}
	
	public byte[] readFileAsBytes(String path){
        File f;
        try {
            //still need to check whether this works inside .Jars
            if(this.getClass().getClassLoader().getResource(path) != null){
                f = new File(this.getClass().getClassLoader().getResource(path).toURI());
            } else {
                f = new File(path);
            }
        } catch (URISyntaxException e1) {
            System.err.println("File URI bad syntax: " + path);
            return new byte[]{};
        }
        
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
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }            
        }
        return new byte[]{};
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
