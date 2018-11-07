package de.codeschluss.portal.common.security.jwt;

import java.io.IOException;
import java.util.Collections;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.codeschluss.portal.functional.user.UserEntity;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    
	private AuthenticationManager authenticationManager;
    private JWTConfiguration securityConfig;

    public JWTAuthenticationFilter(
    		AuthenticationManager authenticationManager,
    		JWTConfiguration securityConfig) {
        this.authenticationManager = authenticationManager;
        this.securityConfig = securityConfig;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            UserEntity creds = new ObjectMapper()
                    .readValue(req.getInputStream(), UserEntity.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                    		creds.getUsername(),
                    		creds.getPassword(),
                    		Collections.emptyList())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
    	JWTUserDetails jwtUserDetails = (JWTUserDetails) auth.getPrincipal();
        String token = JWT.create()
                .withSubject(jwtUserDetails.getUsername())
                .withClaim(securityConfig.getClaimSuperuser(), jwtUserDetails.isSuperUser())
                .withArrayClaim(securityConfig.getClaimCreatedActivities(), jwtUserDetails.getCreatedActivities())
                .withArrayClaim(securityConfig.getClaimApprovedOrgas(), jwtUserDetails.getApprovedOrganisations())
                .withArrayClaim(securityConfig.getClaimAdminOrgas(), jwtUserDetails.getAdminOrgas())
                .withExpiresAt(new Date(System.currentTimeMillis() + securityConfig.getExpirationTime().toMillis()))
                .sign(Algorithm.HMAC512(securityConfig.getSecret()));
        res.addHeader("Authorization", "Bearer " + token);
    }
}