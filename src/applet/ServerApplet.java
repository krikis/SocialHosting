package applet;

import java.awt.*;
import java.awt.event.*;
import java.rmi.Naming;
import java.rmi.RemoteException;
import javax.swing.JApplet;

import server.rmi.RMIRemoteRegistration;
import applet.server.*;

public class ServerApplet extends JApplet implements ActionListener,
		KeyListener {
	// Layout elements for the applet
	private Button startButton;
	private Button stopButton;
	private TextField textField;
	private int textFieldSize;
	private TextArea textArea;
	private Label label;
	// HTTP server running in the applet
	private HTTPServer server = null;
	// Default server port
	private String port = "5555";

	public void init() {
		// Set the layout
		setLayout(new FlowLayout());
		setBackground(Color.WHITE);
		startButton = new Button("Start Server");
		stopButton = new Button("Stop Server");
		stopButton.setEnabled(false);
		label = new Label();
		label.setText("Port: ");
		textField = new TextField(5);
		textFieldSize = 5;
		textField.setText(port);
		textArea = new TextArea("", 10, 60, TextArea.SCROLLBARS_VERTICAL_ONLY);
		textArea.setEditable(false);
		add(label);
		add(textField);
		add(startButton);
		add(stopButton);
		add(textArea);

		// Set eventhandlers
		textField.addKeyListener(this);
		textField.addActionListener(this);
		startButton.addActionListener(this);
		stopButton.addActionListener(this);
	}

	public void paint(Graphics g) {
	}

	public void actionPerformed(ActionEvent evt) {
		if (evt.getSource() == startButton) {
			port = textField.getText();
			startButton.setEnabled(false);
			stopButton.setEnabled(false);
			server = new HTTPServer(this, port);
			server.start();
		} else if (evt.getSource() == stopButton) {
			startButton.setEnabled(false);
			stopButton.setEnabled(false);
			server.stopServer();
		} else if (evt.getSource() == textField) {
			if (startButton.isEnabled()) {
				port = textField.getText();
				startButton.setEnabled(false);
				stopButton.setEnabled(false);
				server = new HTTPServer(this, port);
				server.start();
			}
		}
	}

	public void keyTyped(KeyEvent evt) {
	}

	public void keyPressed(KeyEvent evt) {
		if (evt.getSource() == textField) {
			int key = evt.getKeyCode();
			char character = evt.getKeyChar();
			// skip control characters like return, tab, delete and backspace
			if (Character.isISOControl(character))
				return;
			// check input length
			else if (textField.getText().length() >= textFieldSize
					&& textField.getSelectionStart() == textField
							.getSelectionEnd())
				evt.consume();
			// check input content
			else if (character < '0' || character > '9')
				evt.consume();
		}
	}

	public void keyReleased(KeyEvent evt) {
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
