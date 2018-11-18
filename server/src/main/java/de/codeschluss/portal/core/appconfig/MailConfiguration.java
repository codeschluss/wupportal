package de.codeschluss.portal.core.appconfig;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "mail")
public class MailConfiguration {

  private String fromAddress;
  private String templateLocation;
  private String portalName;
}
