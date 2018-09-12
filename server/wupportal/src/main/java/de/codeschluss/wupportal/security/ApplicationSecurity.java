package de.codeschluss.wupportal.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;

import de.codeschluss.wupportal.user.UserEntity;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

	
//	@Autowired
//	private UserDetailService userDetailsService;
//
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth
//			.userDetailsService(this.userDetailsService)
//			.passwordEncoder(UserEntity.PASSWORD_ENCODER);
//	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http
//		.authorizeRequests()
//			.antMatchers("/built/**", "/main.css").permitAll()
//			.anyRequest().authenticated()
//			.and()
//		.formLogin()
//			.permitAll()
//			.and()
//		.httpBasic()
//			.and()
//		.csrf().disable()
//		.logout()
//			.logoutSuccessUrl("/");
		

	}
}