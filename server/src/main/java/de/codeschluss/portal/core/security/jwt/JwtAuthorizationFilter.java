package de.codeschluss.portal.core.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import de.codeschluss.portal.core.appconfig.JwtConfiguration;
import de.codeschluss.portal.core.security.services.JwtUserDetailsService;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

// TODO: Auto-generated Javadoc
/**
 * The Class JwtAuthorizationFilter.
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

  /** The jwt user details service. */
  private JwtUserDetailsService jwtUserDetailsService;

  /** The security config. */
  private JwtConfiguration securityConfig;

  /**
   * Instantiates a new jwt authorization filter.
   *
   * @param authManager
   *          the auth manager
   * @param jwtUserDetailsService
   *          the JWT user details service
   * @param securityConfig
   *          the security config
   */
  public JwtAuthorizationFilter(
      AuthenticationManager authManager,
      JwtUserDetailsService jwtUserDetailsService, 
      JwtConfiguration securityConfig) {
    super(authManager);
    this.jwtUserDetailsService = jwtUserDetailsService;
    this.securityConfig = securityConfig;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * org.springframework.security.web.authentication.www.BasicAuthenticationFilter
   * #doFilterInternal(javax.servlet.http.HttpServletRequest,
   * javax.servlet.http.HttpServletResponse, javax.servlet.FilterChain)
   */
  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res,
      FilterChain chain) throws IOException, ServletException {

    String header = req.getHeader("Authorization");
    if (header == null || !header.startsWith("Bearer ")) {
      chain.doFilter(req, res);
      return;
    }

    UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    chain.doFilter(req, res);
  }

  /**
   * Gets the authentication.
   *
   * @param request
   *          the request
   * @return the authentication
   */
  private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
    String token = request.getHeader("Authorization");
    if (token != null) {
      String username = getUsername(token);

      if (username != null) {
        return new UsernamePasswordAuthenticationToken(
            jwtUserDetailsService.loadUserByUsername(username), null, Collections.emptyList());
      }
    }
    return null;
  }

  /**
   * Gets the username.
   *
   * @param token
   *          the token
   * @return the username
   */
  private String getUsername(String token) {
    return JWT.require(Algorithm.HMAC512(securityConfig.getSecret())).build()
        .verify(token.replace("Bearer ", "")).getSubject();
  }
}
