package applet;

import java.awt.Button;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.Label;
import java.awt.TextArea;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JApplet;

import applet.server.HTTPServer;

/**
 * This class implements a Java Applet with an interface to start, monitor and
 * stop an internal HTTP-server.
 * 
 * @author Samuel Esposito & Jorn van de Beek
 * 
 */
public class ServerApplet extends JApplet implements ActionListener,
		KeyListener {
	// Layout elements for the applet
	private Button startButton;
	private Button stopButton;
	private Button clearButton;;
	private TextField textField;
	private int textFieldSize;
	private TextArea textArea;
	private Label label;
	// HTTP server running in the applet
	private HTTPServer server = null;
	// Default server port
	private String port = "80";

	public void init() {
		// Set the layout
		setLayout(new FlowLayout());
		setBackground(new Color(85, 153, 187));
		startButton = new Button("Start Server");
		stopButton = new Button("Stop Server");
		clearButton = new Button("Clear Log");
		stopButton.setEnabled(false);
		label = new Label();
		label.setText("Port: ");
		textField = new TextField(5);
		textFieldSize = 5;
		textField.setText(port);
		textArea = new TextArea("", 10, 73, TextArea.SCROLLBARS_VERTICAL_ONLY);
		textArea.setEditable(false);
		add(label);
		add(textField);
		add(startButton);
		add(stopButton);
		add(clearButton);
		add(textArea);

		// Set eventhandlers
		textField.addKeyListener(this);
		textField.addActionListener(this);
		startButton.addActionListener(this);
		stopButton.addActionListener(this);
		clearButton.addActionListener(this);
	}

	public void paint(Graphics g) {
	}

	public void actionPerformed(ActionEvent evt) {
		// The start button is pressed => starts the HTTP-server
		if (evt.getSource() == startButton) {
			port = textField.getText();
			startButton.setEnabled(false);
			stopButton.setEnabled(false);
			server = new HTTPServer(this, port);
			server.start();
			// The stop button is pressed => stops the HTTP-server
		} else if (evt.getSource() == stopButton) {
			startButton.setEnabled(false);
			stopButton.setEnabled(false);
			server.stopServer();
			// The clear button is pressed => clears the log
		} else if (evt.getSource() == clearButton) {
			clearButton.setEnabled(false);
			textArea.setText("");
			clearButton.setEnabled(true);
			// Return key is hit on text field => starts the HTTP-server
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
		// Validates the length and content of the text field input
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

	/**
	 * This method sets the Applet interface in the Running Server mode
	 */
	public void setServerStarted() {
		textField.setEnabled(false);
		startButton.setEnabled(false);
		clearButton.setEnabled(false);
		stopButton.setEnabled(true);
		clearButton.setEnabled(true);
	}

	/**
	 * This method sets the Applet interface in the Idle Server mode
	 */
	public void setServerStopped() {
		textField.setEnabled(true);
		startButton.setEnabled(true);
		clearButton.setEnabled(false);
		stopButton.setEnabled(false);
		clearButton.setEnabled(true);
	}

	/**
	 * This method adds a string to the Applet log
	 * 
	 * @param text
	 *            the text to add to the applet log
	 */
	public void log(String text) {
		textArea.append(text + "\n");
		repaint();
	}

	/**
	 * This method prints an error message and stacktrace to the Applet log
	 * 
	 * @param e
	 *            the exception to report
	 */
	public void reportError(Exception e) {
		log(e.getMessage());
		log(e.getClass().toString());
		StackTraceElement[] trace = e.getStackTrace();
		for (int index = 0; index < trace.length; index++) {
			log(trace[index].toString());
		}
	}
}
