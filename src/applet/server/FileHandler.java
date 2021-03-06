package applet.server;

import java.io.InputStream;

import applet.ServerApplet;

/**
 * This class implements reading a file from a jar file and returning its
 * contents as an array of bytes.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class FileHandler {
	// the path to the requested file
	private String filePath;
	// the file root in the jarfile
	private static String root = "/public";
	// the server status
	private String status;
	// the extension of the requested file
	private String mime;
	// the applet to call back to
	private ServerApplet applet;

	/**
	 * Constructs a {@link FileHandler} object given the relative path to the
	 * requested file in the server file root. Sets the files mime type.
	 * 
	 * @param path
	 *            the relative path to the requested file in the server file
	 *            root
	 */
	public FileHandler(ServerApplet log, String path) {
		applet = log;
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
		InputStream is;
		try {
			is = applet.getClass().getResourceAsStream(filePath);
			if (is == null) {
				status = HTTPResponse.NOT_FOUND; // set server status
				return "\n".getBytes();
			}
			int initial = 1024;
			byte[] bytecode = new byte[initial];
			int offset = 0;
			int empty = bytecode.length;
			int read = 0;
			while (-1 != read) {
				read = is.read(bytecode, offset, empty);
				if (read >= empty) {
					byte[] temp = new byte[bytecode.length * 2];
					for (int index = 0; index < bytecode.length; index++) {
						temp[index] = bytecode[index];
					}
					offset = bytecode.length;
					empty = offset;
					bytecode = temp;
				} else {
					byte[] temp = null;
					if (bytecode.length == initial) {
						temp = new byte[read];
					} else {
						temp = new byte[(bytecode.length / 2) + read];
					}
					for (int index = 0; index < temp.length; index++) {
						temp[index] = bytecode[index];
					}
					bytecode = temp;
					break;
				}
			}
			status = HTTPResponse.OK; // set server status
			return bytecode;
		} catch (Exception e) {
			applet.reportError(e);
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
