package example;
// Copyright (C) Bill Clagett 1997.

import java.net.*;
import java.util.*;

/** 
 * The Port Scanner application
 *
 * @author  Bill Clagett (bill.clagett@sitesonthe.net)
 * @version %I%, %G% 
*/
public class PortScanner {
	/**
	* Process arguments.  
	* Make a PortFactory.
	* Make and start a bunch of ScannerThreads.
	* @see portscanner.PortFactory
	* @see portscanner.ScannerThread
	*/
	public static void main(String[] argv)
	{
		PortFactory ports = null;
		int firstPort = 1;
		int lastPort = 256;
		int threads = 100;
		InetAddress host = null;

		int nextArg = 0;
		while ( nextArg < argv.length)
		{
			String arg = argv[nextArg++];
			try
			{
				if (arg.equalsIgnoreCase("-threads"))
				{
					threads = Integer.parseInt(argv[nextArg++]);
				}
				else if (arg.equalsIgnoreCase("-host"))
				{
					host = InetAddress.getByName(argv[nextArg++]);
				}
				else if (arg.equalsIgnoreCase("-ports"))
				{
					firstPort = Integer.parseInt(argv[nextArg++]);
					lastPort = Integer.parseInt(argv[nextArg++]);
				}
				else if (arg.equalsIgnoreCase("-?")||arg.equalsIgnoreCase("-h")||arg.equalsIgnoreCase("-help"))
				{
					System.out.println("arguments:  -host s [-threads n] [-ports n m]");
					System.exit(0);
				}
				else 
				{
					badArg("Unknown command-line argument: "+arg);
				}
			}
			catch (ArrayIndexOutOfBoundsException e)
			{
				badArg("missing item after " + arg);
			}
			catch (NumberFormatException e)
			{
				badArg("bad number format for " + arg + ": " + argv[nextArg-1]);
			}
			catch (UnknownHostException e) 
			{
				badArg(argv[nextArg-1] + " is not a valid host name.");
			}
		}

		if (host == null)
			badArg("No host specified");

		System.out.println("host: "+host+" ports: "+firstPort+"-"+lastPort+" threads: "+threads);
				
		ports = new PortFactory(host, firstPort, lastPort);
		for (int i = 0; i < threads; i++)
		{
			ScannerThread t = new ScannerThread(ports);
			t.start();
		}
	}  

	static private void badArg(String s)
	{
		System.out.println(s);
		System.exit(1);
	}

}
