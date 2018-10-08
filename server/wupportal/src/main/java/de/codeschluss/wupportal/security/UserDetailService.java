package de.codeschluss.wupportal.security;

import java.util.Collections;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import de.codeschluss.wupportal.user.UserEntity;
import de.codeschluss.wupportal.user.UserRepository;

@Component
public class UserDetailService implements UserDetailsService {

	private UserRepository userRepository;

	public UserDetailService(UserRepository repository, HttpServletRequest request) {
		this.userRepository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = this.userRepository.findByUsername(username);
		return new User(user.getUsername(), user.getPassword(), Collections.emptyList());
	}

}