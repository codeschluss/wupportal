package de.codeschluss.portal.core.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.security.services.JwtTokenService;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenService tokenService;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
      JwtTokenService tokenService) {
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
      throws AuthenticationException {
    try {
      UserEntity creds = new ObjectMapper().readValue(req.getInputStream(), UserEntity.class);

      return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          creds.getUsername(), creds.getPassword(), Collections.emptyList()));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected void successfulAuthentication(
      HttpServletRequest req, 
      HttpServletResponse res,
      FilterChain chain, 
      Authentication auth) throws IOException, ServletException {
    res.setContentType("application/json");
    ObjectMapper objectMapper = new ObjectMapper();    
    
    Map<String, String> tokenMap = new HashMap<String, String>();
    tokenMap.put("access", tokenService.createAccessToken(auth));
    tokenMap.put("refresh", tokenService.createRefreshToken(auth));
    
    objectMapper.writeValue(res.getWriter(), tokenMap);
  }
}