package de.codeschluss.wupportal.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {


	private JWTUserDetailService userDetailsService;
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	private JWTConfiguration jwtConfig;
	
	public ApplicationSecurity(
			JWTUserDetailService jWTUserDetailService, 
			BCryptPasswordEncoder encoder,
			JWTConfiguration jwtConfig) {
		this.userDetailsService = jWTUserDetailService;
		this.bCryptPasswordEncoder = encoder;
		this.jwtConfig = jwtConfig;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.userDetailsService(this.userDetailsService)
			.passwordEncoder(bCryptPasswordEncoder);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf().disable()
		.authorizeRequests()
			.antMatchers(HttpMethod.POST, "*/users*").permitAll()
        	.anyRequest().authenticated()
        .and()
        .addFilter(new JWTAuthenticationFilter(authenticationManager(), jwtConfig))
        .addFilter(new JWTAuthorizationFilter(authenticationManager(), userDetailsService, jwtConfig))
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
}