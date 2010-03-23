package applet;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.rmi.Naming;
import java.rmi.RemoteException;

import javax.swing.JApplet;

import example.rmi_server_applet.Hello;

import server.rmi.RMIRemoteRegistration;

import applet.server.*;

public class ServerApplet extends JApplet implements ActionListener {
	// Layout elements for the applet
	private Button startButton;
	private Button stopButton;
	private TextField textField;
	private TextArea textArea;
	// HTTP server running in the applet
	private HTTPServer server = null;
	// Default server port
	private int port = 5555;
	
	public void init() {
		// Set the layout
		setLayout(new FlowLayout());
		setBackground(Color.WHITE);
		startButton = new Button("Start Server");
		stopButton = new Button("Stop Server");
		stopButton.setEnabled(false);
		textField = new TextField();
		textField.setText(Integer.toString(port));
		textArea = new TextArea("", 10, 60, TextArea.SCROLLBARS_VERTICAL_ONLY);
		textArea.setEditable(false);
		add(startButton);
		add(stopButton);
		add(textArea);

		// Attach actions to buttons
		startButton.addActionListener(this);
		stopButton.addActionListener(this);

	}

	public void paint(Graphics g) {
	}

	public void actionPerformed(ActionEvent evt) {
		if (evt.getSource() == startButton) {
			startButton.setEnabled(false);
			stopButton.setEnabled(false);
			server = new HTTPServer(this);
			server.start();
		} else if (evt.getSource() == stopButton) {
			startButton.setEnabled(false);
			stopButton.setEnabled(false);
			server.stopServer();
		}
	}

	public void setServerStarted() {
		startButton.setEnabled(false);
		stopButton.setEnabled(true);
	}

	public void setServerStopped() {
		startButton.setEnabled(true);
		stopButton.setEnabled(false);
	}

	public void log(String text) {
		textArea.append(text + "\n");
		repaint();
	}

	public void reportError(Exception e) {
		log(e.getMessage());
		log(e.getClass().toString());
		StackTraceElement[] trace = e.getStackTrace();
		for (int index = 0; index < trace.length; index++) {
			log(trace[index].toString());
		}
	}
}
