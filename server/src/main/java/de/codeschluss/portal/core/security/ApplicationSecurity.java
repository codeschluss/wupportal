package de.codeschluss.portal.core.security;

import de.codeschluss.portal.core.security.jwt.JwtAuthenticationFilter;
import de.codeschluss.portal.core.security.jwt.JwtAuthorizationFilter;
import de.codeschluss.portal.core.security.services.JwtTokenService;
import de.codeschluss.portal.core.security.services.JwtUserDetailsService;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

// TODO: Auto-generated Javadoc
/**
 * The Class ApplicationSecurity.
 * 
 * @author Valmir Etemi
 *
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

  /** The user details service. */
  private final JwtUserDetailsService userDetailsService;
  
  /** The bcrypt password encoder. */
  private final BCryptPasswordEncoder bcryptPasswordEncoder;
  
  /** The token service. */
  private final JwtTokenService tokenService;

  /**
   * Instantiates a new application security.
   *
   * @param jwtUserDetailsService the jwt user details service
   * @param encoder the encoder
   * @param tokenService the token service
   */
  public ApplicationSecurity(
      JwtUserDetailsService jwtUserDetailsService,
      BCryptPasswordEncoder encoder, 
      JwtTokenService tokenService) {
    this.userDetailsService = jwtUserDetailsService;
    this.bcryptPasswordEncoder = encoder;
    this.tokenService = tokenService;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.springframework.security.config.annotation.web.configuration.
   * WebSecurityConfigurerAdapter#configure(org.springframework.security.config.
   * annotation.authentication.builders.AuthenticationManagerBuilder)
   */
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(this.userDetailsService).passwordEncoder(bcryptPasswordEncoder);
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.springframework.security.config.annotation.web.configuration.
   * WebSecurityConfigurerAdapter#configure(org.springframework.security.config.
   * annotation.web.builders.HttpSecurity)
   */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
    .csrf().disable()
    .headers().frameOptions().sameOrigin()
      .and()
    .addFilter(jwtAuthenticationFilter())
    .addFilter(jwtAuthorizationFilter())
    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }
  
  /**
   * Jwt authentication filter.
   *
   * @return the jwt authentication filter
   * @throws Exception the exception
   */
  public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception {
    return new JwtAuthenticationFilter(
        authenticationManager(), 
        tokenService);
  }
  
  /**
   * Jwt authorization filter.
   *
   * @return the jwt authorization filter
   * @throws Exception the exception
   */
  public JwtAuthorizationFilter jwtAuthorizationFilter() throws Exception {
    return new JwtAuthorizationFilter(
        authenticationManager(), 
        userDetailsService, 
        tokenService);
  }
}