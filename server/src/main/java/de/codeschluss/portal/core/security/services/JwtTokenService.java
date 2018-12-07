package de.codeschluss.portal.core.security.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import de.codeschluss.portal.core.exception.InvalidTokenException;
import de.codeschluss.portal.core.security.JwtConfiguration;
import de.codeschluss.portal.core.security.jwt.JwtUserDetails;

import java.util.Arrays;
import java.util.Date;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class JwtTokenService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class JwtTokenService {
  
  /** The security config. */
  private JwtConfiguration securityConfig;

  /**
   * Instantiates a new jwt token service.
   *
   * @param securityConfig the security config
   */
  public JwtTokenService(JwtConfiguration securityConfig) {
    this.securityConfig = securityConfig;
  }
  
  /**
   * Creates the access token.
   *
   * @param jwtUserDetails the jwt user details
   * @return the string
   */
  public String createAccessToken(JwtUserDetails jwtUserDetails) {
    return JWT.create().withSubject(jwtUserDetails.getUsername())
        .withClaim(securityConfig.getClaimSuperuser(), jwtUserDetails.isSuperUser())
        .withArrayClaim(securityConfig.getClaimCreatedActivities(),
            jwtUserDetails.getCreatedActivities())
        .withArrayClaim(securityConfig.getClaimApprovedOrgas(),
            jwtUserDetails.getApprovedOrganisations())
        .withArrayClaim(securityConfig.getClaimAdminOrgas(), jwtUserDetails.getAdminOrgas())
        .withArrayClaim(securityConfig.getClaimScopes(), 
            new String[] {securityConfig.getScopeAccess()})
        .withExpiresAt(
            new Date(
                System.currentTimeMillis() + securityConfig.getExpirationTimeAccess().toMillis()))
        .sign(Algorithm.HMAC512(securityConfig.getSecret()));
  }
  
  /**
   * Creates the refresh token.
   *
   * @param jwtUserDetails the jwt user details
   * @return the string
   */
  public String createRefreshToken(JwtUserDetails jwtUserDetails) {
    return JWT.create().withSubject(jwtUserDetails.getUsername())
        .withArrayClaim(securityConfig.getClaimScopes(), 
            new String[] {securityConfig.getScopeRefresh()})
        .withExpiresAt(
            new Date(
                System.currentTimeMillis() + securityConfig.getExpirationTimeRefresh().toMillis()))
        .sign(Algorithm.HMAC512(securityConfig.getSecret()));
  }
  
  /**
   * Verify access.
   *
   * @param token the token
   * @throws InvalidTokenException the invalid token exception
   */
  public void verifyAccess(String token) throws InvalidTokenException {
    if (!verifyWithScope(token, securityConfig.getScopeAccess())) {
      throw new InvalidTokenException(
          "Token must contain scope: " + securityConfig.getScopeAccess());
    }
  }
  
  /**
   * Verify refresh.
   *
   * @param token the token
   * @throws InvalidTokenException the invalid token exception
   */
  public void verifyRefresh(String token) throws InvalidTokenException {
    if (!verifyWithScope(token, securityConfig.getScopeRefresh())) {
      throw new InvalidTokenException(
          "Token must contain scope: " + securityConfig.getScopeRefresh());
    }
  }
  
  /**
   * Verify with scope.
   *
   * @param token the token
   * @param requiredScope the required scope
   * @return true, if successful
   */
  private boolean verifyWithScope(String token, String requiredScope) {
    String[] scopes = verify(token).getClaim(securityConfig.getClaimScopes()).asArray(String.class);
    return Arrays.asList(scopes).stream()
        .anyMatch(scope -> scope.equals(requiredScope));
  }
  
  /**
   * Verify and extract username.
   *
   * @param token the token
   * @return the string
   */
  public String extractUsername(String token) {
    return verify(token).getSubject();
  }
  
  /**
   * Verify.
   *
   * @param token the token
   * @return the decoded JWT
   */
  public DecodedJWT verify(String token) {
    return JWT
      .require(Algorithm.HMAC512(securityConfig.getSecret()))
      .build()
      .verify(token.replace("Bearer ", ""));
  }
}
