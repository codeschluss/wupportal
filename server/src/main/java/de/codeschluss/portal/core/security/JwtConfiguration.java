package de.codeschluss.portal.core.security;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DurationUnit;
import org.springframework.context.annotation.Configuration;

/**
 * The Class JwtConfiguration.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@ConfigurationProperties(prefix = "jwt")
@Configuration
public class JwtConfiguration {

  @DurationUnit(ChronoUnit.HOURS)
  private Duration expirationTimeAccess = Duration.ofHours(12);
  
  @DurationUnit(ChronoUnit.HOURS)
  private Duration expirationTimeRefresh = Duration.ofHours(12);

  private String secret;
  private String claimSuperuser;
  private String claimUserid;
  private String claimApprovedOrgas;
  private String claimAdminOrgas;
  private String claimCreatedActivities;
  private String claimScopes;
  private String scopeRefresh;
  private String scopeAccess;
}
