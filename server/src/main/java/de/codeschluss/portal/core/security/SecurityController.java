package de.codeschluss.portal.core.security;

import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.core.exception.InvalidTokenException;
import de.codeschluss.portal.core.security.services.JwtTokenService;
import de.codeschluss.portal.core.security.services.JwtUserDetailsService;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// TODO: Auto-generated Javadoc
/**
 * The Class SecurityController.
 */
@RestController
public class SecurityController {
  
  /** The token service. */
  private final JwtTokenService tokenService;
  
  /** The user detail service. */
  private final JwtUserDetailsService userDetailService;
  
  /**
   * Instantiates a new security controller.
   *
   * @param tokenService the token service
   * @param userDetailService the user detail service
   */
  public SecurityController(
      JwtTokenService tokenService,
      JwtUserDetailsService userDetailService) {
    this.tokenService = tokenService;
    this.userDetailService = userDetailService;
  }
  
  /**
   * Refresh token.
   *
   * @param req the req
   * @return the response entity
   * @throws InvalidTokenException the invalid token exception
   */
  @GetMapping("/refresh")
  public ResponseEntity<String> refreshToken(HttpServletRequest req) throws Exception {
    String token = req.getHeader("Authorization");
    tokenService.verifyRefresh(token);
    
    String username = tokenService.extractUsername(token);
    return ok(tokenService.createAccessToken(userDetailService.loadUserByUsername(username)));
  }

}
