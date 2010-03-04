package server.http;

import java.util.StringTokenizer;

public class HTTPRequest {
	
	private String method;
	
	private String path;
	
	public HTTPRequest(String request) {
		StringTokenizer tokenizer = new StringTokenizer(request);
		method = tokenizer.nextToken();
		path = tokenizer.nextToken();
	}
	
	public String method() {
		return method;
	}
	
	public String path() {
		return path;
	}
	
	public String toString() {
		return "HTTP METHOD: " + method + "\nHTTP REQUEST PATH: " + path + "\n";
	}
}
