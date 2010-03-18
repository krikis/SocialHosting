package server.http;

import java.util.StringTokenizer;

public class HTTPRequest {

	private String plainHeader;

	private String method;

	private String path;

	public HTTPRequest(String request) {
		plainHeader = request;
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
		return plainHeader;
	}
}
