package de.codeschluss.portal.core.mail;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetup;

import javax.annotation.PreDestroy;

import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * The Class DummyMailServer.
 * 
 * @author Valmir Etemi
 *
 */
@Component
@Profile({"dev", "int"})
public class DummyMailServer {
  
  /** The smtp server. */
  private GreenMail smtpServer;
  
  /**
   * Instantiates a new dummy mail server.
   */
  public DummyMailServer(
      Environment env) {
    int port = env.getProperty("spring.mail.port", Integer.class);
    String host = env.getProperty("spring.mail.host");
    smtpServer = new GreenMail(new ServerSetup(port, host, "smtp"));
    smtpServer.start();
  }
  
  @PreDestroy
  public void cleanupBeforeExit() {
    smtpServer.stop();
  }
}
