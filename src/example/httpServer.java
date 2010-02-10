package example;
import java.net.*;
import java.util.*;
import java.io.*;

public class httpServer {
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
			ServerSocket ss = new ServerSocket(8888);
			ss.setSoTimeout(100000);
			Socket s = ss.accept();
			DataOutputStream os = new DataOutputStream(s.getOutputStream());
			DataInputStream in = new DataInputStream(s.getInputStream());
			BufferedReader is = new BufferedReader(new InputStreamReader(in));
			if (s != null && os != null && is != null) {
				String reply;
				boolean proceed = true;
				while ((reply = is.readLine()) != null && proceed) {
					System.out.println(reply);
					if (reply==null) {
						proceed = false;
					}
				}
				if(!proceed)
					os.writeBytes("OK got it");
			}
			is.close();
			os.close();
			s.close();
		}
		catch (java.io.InterruptedIOException e){
			System.out.println("Timeout");
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
