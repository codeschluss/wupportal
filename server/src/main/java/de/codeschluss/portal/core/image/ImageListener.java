package de.codeschluss.portal.core.image;

import com.twelvemonkeys.servlet.image.IIOProviderContextListener;

import javax.annotation.ManagedBean;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.boot.web.servlet.ServletContextInitializer;

/**
 * The Class ImageListener.
 * 
 * @author vetemi
 *
 */
@ManagedBean
public class ImageListener implements ServletContextInitializer {

  @Override
  public void onStartup(ServletContext servletContext) throws ServletException {
    servletContext.addListener(IIOProviderContextListener.class);
  }
}
