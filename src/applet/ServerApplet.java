package applet;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.jar.*;
import java.util.zip.ZipEntry;
import javax.swing.JApplet;

import applet.server.*;

public class ServerApplet extends JApplet implements ActionListener {
	private Button startButton;
	private Button stopButton;
	private TextArea textArea;
	private String serverLog = "";
	private HTTPServer server = null;

	public void init() {
		// Set the layout
		setLayout(new FlowLayout());
		startButton = new Button("Start Server");
		stopButton = new Button("Stop Server");
		stopButton.setEnabled(false);
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
			stopButton.setEnabled(true);
			server = new HTTPServer(this);
			server.start();
		} else if (evt.getSource() == stopButton) {
			startButton.setEnabled(true);
			stopButton.setEnabled(false);
			server.stopServer();
		}
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
