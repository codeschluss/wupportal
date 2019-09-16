package de.codeschluss.portal.core.image;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * The Class ImageConfiguration.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "images")
public class ImageConfiguration {

  private int maxHeight;
  private int maxWidth;
}
