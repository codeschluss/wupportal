package de.codeschluss.portal.core.appconfig;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DurationUnit;
import org.springframework.context.annotation.Configuration;

@Data
@ConfigurationProperties(prefix = "jwt")
@Configuration
public class JwtConfiguration {

  @DurationUnit(ChronoUnit.HOURS)
  private Duration expirationTime = Duration.ofHours(12);

  private String secret;
  private String claimSuperuser;
  private String claimApprovedOrgas;
  private String claimAdminOrgas;
  private String claimCreatedActivities;
}
