
import java.io.IOException;

import javax.swing.JApplet;
import javax.swing.JOptionPane;

import example.HTTPSimpleServer;


public class ServerApplet extends JApplet {
    
    public void init(){
        int reply = JOptionPane.showConfirmDialog(null,
                "Do you wish to help out in hosting this web page?",
                "SocialHosting", JOptionPane.YES_NO_OPTION);
        if(reply != 0){ 
            return;
        }
        
//        try {
//            new HTTPSimpleServer(4949);
//        } catch (IOException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
    }
    
    @Override
    public void start() {
      
    }
}
