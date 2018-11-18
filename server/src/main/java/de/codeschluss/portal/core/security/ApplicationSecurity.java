package de.codeschluss.portal.core.security;

import de.codeschluss.portal.core.appconfig.JwtConfiguration;
import de.codeschluss.portal.core.security.jwt.JwtAuthenticationFilter;
import de.codeschluss.portal.core.security.jwt.JwtAuthorizationFilter;
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
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

  /** The user details service. */
  private JwtUserDetailsService userDetailsService;
  
  /** The bcrypt password encoder. */
  private BCryptPasswordEncoder bcryptPasswordEncoder;
  
  /** The jwt config. */
  private JwtConfiguration jwtConfig;

  /**
   * Instantiates a new application security.
   *
   * @param jwtUserDetailsService the jwt user details service
   * @param encoder the encoder
   * @param jwtConfig the jwt config
   */
  public ApplicationSecurity(
      JwtUserDetailsService jwtUserDetailsService,
      BCryptPasswordEncoder encoder, JwtConfiguration jwtConfig) {
    this.userDetailsService = jwtUserDetailsService;
    this.bcryptPasswordEncoder = encoder;
    this.jwtConfig = jwtConfig;
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
    http.csrf().disable()
        .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtConfig))
        .addFilter(
            new JwtAuthorizationFilter(authenticationManager(), userDetailsService, jwtConfig))
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }
}