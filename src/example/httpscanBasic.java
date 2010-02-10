package example;
import java.net.*;
import java.util.*;
import java.io.*;

public class httpscanBasic {
    public static void main(String args[]) {

		InetAddress host = null;
		int nextArg = 0;
		while ( nextArg < args.length)
		{
			String arg = args[nextArg++];
			try
			{
				if (arg.equalsIgnoreCase("-h") || arg.equalsIgnoreCase("-host"))
					host = InetAddress.getByName(args[nextArg++]);
				else 
					badArg("Unknown command-line argument: "+arg);
			}
			catch (ArrayIndexOutOfBoundsException e)
			{	badArg("missing item after " + arg);}
			catch (NumberFormatException e)
			{	badArg("bad number format for " + arg + ": " + args[nextArg-1]);}
			catch (UnknownHostException e) 
			{	badArg(args[nextArg-1] + " is not a valid host name.");}
		}
		if (host == null)
			badArg("No host specified");
		
		try 
		{
			Socket s = new Socket(host, 80);
			DataOutputStream os = new DataOutputStream(s.getOutputStream());
			DataInputStream in = new DataInputStream(s.getInputStream());
			BufferedReader is = new BufferedReader(new InputStreamReader(in));
			if (s != null && os != null && is != null) {
				String request = "GET / HTTP/1.1\nHost: ";
				request += host+"80\nAccept: */*\nAccept-Language: en\n";
				request += "Connection: Keep-Alive\nUser-Agent: Mozilla/4.0 (compatible;";
				request += "MSIE 5.14; Mac_PowerPC)\nUA-OS: MacOS\nUA-CPU: PPC\n";
				request += "Extension: Security/Remote-Passphrase\n\n\n";
				os.writeBytes(request);
				String reply;
				boolean proceed = true;
				while ((reply = is.readLine()) != null && proceed) {
					System.out.println(reply);
					if (reply==null) {
						proceed = false;
					}
				}
			}
			is.close();
			os.close();
			s.close();
		}
		catch (IOException e) {
			System.out.println(e);
		}
		catch(Exception e){
			System.out.println("Port 80 is not available on "+ host);
		}
		
		
	   }


	static private void badArg(String s)
	{
		System.out.println(s);
		System.exit(1);
	}

}
