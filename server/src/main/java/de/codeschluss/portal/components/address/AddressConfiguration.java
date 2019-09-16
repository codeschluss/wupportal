package de.codeschluss.portal.components.address;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * The Class AddressConfiguration.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "address")
public class AddressConfiguration {
  
  private String serviceSubscriptionKey;
  private String serviceUrl;

}
