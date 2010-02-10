package example;
// Copyright (C) Bill Clagett 1997.
import java.util.*;
import java.net.*;

/** 
 * Generates ports from a given machine in a given range.
 *
 * @author  Bill Clagett (bill.clagett@sitesonthe.net)
 * @version %I%, %G% 
*/
class PortFactory implements Enumeration
{
	/**
	* the host to generate ports from 
	*/
	InetAddress _host = null;
	/**
	* the first port# to supply
	*/
	int _firstPort = -1;
	/**
	* the last port# to supply
	*/
	int _lastPort = -1;
	/**
	* the port# to supply next
	*/
	int _nextPort = -1;
	/**
	* Contructor
	* @arg host 
	* @arg firstPort The first port in the range to supply
	* @art lastPort The last port in the range to supply
	* @see java.util.Enumeration.hasMoreElements()
	*/
	PortFactory(InetAddress host, int firstPort, int lastPort)
	{
		_host = host;
		_nextPort = _firstPort = firstPort;
		_lastPort = lastPort;
	}

	/**
	* @return true iff there are more ports.
	* @see java.util.Enumeration.hasMoreElements()
	*/
	public boolean hasMoreElements()
	{
		return (_nextPort <= _lastPort);
	}

	/**
	* @return next port
	* @see java.util.Enumeration.nextElement()
	*/
	public Object nextElement()
	{
		return new Port(_host, _nextPort++);
	}
}
