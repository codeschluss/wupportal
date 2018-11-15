package de.codeschluss.portal.common.security.jwt;

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

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import de.codeschluss.portal.common.appconfig.JWTConfiguration;
import de.codeschluss.portal.common.security.services.JWTUserDetailsService;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
	
	private JWTUserDetailsService jWTUserDetailsService;
    private JWTConfiguration securityConfig;

    public JWTAuthorizationFilter(
    		AuthenticationManager authManager,
    		JWTUserDetailsService jWTUserDetailsService,
    		JWTConfiguration securityConfig) {
    	super(authManager);
    	this.jWTUserDetailsService = jWTUserDetailsService;
    	this.securityConfig = securityConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
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

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null) {
        	String username = getUsername(token);
        	
            if (username != null) {
                return new UsernamePasswordAuthenticationToken(jWTUserDetailsService.loadUserByUsername(username), null, Collections.emptyList());
            }
        }
        return null;
    }
    
	private String getUsername(String token) {
		return JWT.require(Algorithm.HMAC512(securityConfig.getSecret()))
	        .build()
	        .verify(token.replace("Bearer ", ""))
	        .getSubject();
	}
}
