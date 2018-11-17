package de.codeschluss.portal.core.appconfig;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "mail")
public class MailConfiguration {
	
	private String fromAddress;
	private String templateLocation;
	private String portalName;
}

