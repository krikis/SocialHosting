package server.http;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 * This class implements reading a file from the file system and returning its
 * contents as an array of bytes.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class FileHandler {
	// the path to the requested file
	private String filePath;
	// the server file root
	private static String root = "../www";
	// the server status
	private String status;
	// the extension of the requested file
	private String mime;

	/**
	 * Constructs a {@link FileHandler} object given the relative path to the
	 * requested file in the server file root.
	 * 
	 * @param path
	 *            the relative path to the requested file in the server file
	 *            root
	 */
	public FileHandler(String path) {
		// Set files path
		filePath = root + path;
		if (filePath.substring(filePath.length() - 1).equals("/"))
			filePath += "index.html";
		// Set files mime type
		if (filePath.substring(filePath.length() - 5).equals(".html"))
			mime = HTTPResponse.HTML_MIME;
		else if (filePath.substring(filePath.length() - 4).equals(".htm"))
			mime = HTTPResponse.HTML_MIME;
		else if (filePath.substring(filePath.length() - 3).equals(".js"))
			mime = HTTPResponse.JS_MIME;
		else if (filePath.substring(filePath.length() - 4).equals(".css"))
			mime = HTTPResponse.CSS_MIME;
		else if (filePath.substring(filePath.length() - 4).equals(".png"))
			mime = HTTPResponse.PNG_MIME;
		else if (filePath.substring(filePath.length() - 4).equals(".jpg"))
			mime = HTTPResponse.JPG_MIME;
		else if (filePath.substring(filePath.length() - 4).equals(".gif"))
			mime = HTTPResponse.GIF_MIME;
		else if (filePath.substring(filePath.length() - 4).equals(".jar"))
			mime = HTTPResponse.JAR_MIME;
		else if (filePath.substring(filePath.length() - 5).equals(".jnlp"))
			mime = HTTPResponse.JNLP_MIME;
		else if (filePath.substring(filePath.length() - 6).equals(".class"))
			mime = HTTPResponse.CLASS_MIME;
		else
			mime = HTTPResponse.HTML_MIME;
	}

	/**
	 * Reads the contents of the requested file and returns it as a byte array.
	 * When the file cannot be found, the server status is set to
	 * "404 NOT FOUND". Else the status will be "200 OK".
	 * 
	 * @return the content of the requested file as a byte array.
	 */
	public byte[] readAsBytes() {
		File f;
		try {
			f = new File(filePath);
		} catch (NullPointerException e) {
			status = HTTPResponse.NOT_FOUND; // set server status
			return "\n".getBytes();
		}

		FileInputStream fin;
		try {
			fin = new FileInputStream(f);
			DataInputStream in = new DataInputStream(fin);

			byte[] bytecodes = new byte[(int) (f.length())];
			in.readFully(bytecodes);

			status = HTTPResponse.OK; // set server status
			return bytecodes;
		} catch (FileNotFoundException e) {
			status = HTTPResponse.NOT_FOUND; // set server status
			return "\n".getBytes();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new byte[] {};
	}

	/**
	 * Returns the server status.
	 * 
	 * @return the server status
	 */
	public String serverStatus() {
		return status;
	}

	/**
	 * Returns the requested files extension.
	 * 
	 * @return the requested files extension
	 */
	public String mimeType() {
		return mime;
	}
}
