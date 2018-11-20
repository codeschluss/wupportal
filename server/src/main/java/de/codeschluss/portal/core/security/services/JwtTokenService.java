package de.codeschluss.portal.core.security.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import de.codeschluss.portal.core.appconfig.JwtConfiguration;
import de.codeschluss.portal.core.security.jwt.JwtUserDetails;

import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenService {
  
  private JwtConfiguration securityConfig;

  public JwtTokenService(JwtConfiguration securityConfig) {
    this.securityConfig = securityConfig;
  }
  
  /**
   * Creates the access token.
   *
   * @param auth the auth
   * @return the string
   */
  public String createAccessToken(Authentication auth) {
    JwtUserDetails jwtUserDetails = (JwtUserDetails) auth.getPrincipal();
    return JWT.create().withSubject(jwtUserDetails.getUsername())
        .withClaim(securityConfig.getClaimSuperuser(), jwtUserDetails.isSuperUser())
        .withArrayClaim(securityConfig.getClaimCreatedActivities(),
            jwtUserDetails.getCreatedActivities())
        .withArrayClaim(securityConfig.getClaimApprovedOrgas(),
            jwtUserDetails.getApprovedOrganisations())
        .withArrayClaim(securityConfig.getClaimAdminOrgas(), jwtUserDetails.getAdminOrgas())
        .withArrayClaim("scopes", new String[] {"access"})
        .withExpiresAt(
            new Date(
                System.currentTimeMillis() + securityConfig.getExpirationTimeAccess().toMillis()))
        .sign(Algorithm.HMAC512(securityConfig.getSecret()));
  }
  
  /**
   * Creates the refresh token.
   *
   * @param auth the auth
   * @return the string
   */
  public String createRefreshToken(Authentication auth) {
    JwtUserDetails jwtUserDetails = (JwtUserDetails) auth.getPrincipal();
    return JWT.create().withSubject(jwtUserDetails.getUsername())
        .withArrayClaim("scopes", new String[] {"refresh"})
        .withExpiresAt(
            new Date(
                System.currentTimeMillis() + securityConfig.getExpirationTimeRefresh().toMillis()))
        .sign(Algorithm.HMAC512(securityConfig.getSecret()));
  }
  
  public String verifyAndExtractUsername(String token) {
    return JWT.require(Algorithm.HMAC512(securityConfig.getSecret())).build()
        .verify(token.replace("Bearer ", "")).getSubject();
  }

}
