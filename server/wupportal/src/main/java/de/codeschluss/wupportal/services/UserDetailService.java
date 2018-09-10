package de.codeschluss.wupportal.services;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import de.codeschluss.wupportal.users.UserRepository;

//@Component
//public class UserDetailService implements UserDetailsService {
//
//	private UserRepository userRepository;
//
//	public UserDetailService(UserRepository repository, HttpServletRequest request) {
//		this.userRepository = repository;
//	}
//
//	@Override
//	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
////		return userRepository.findByUsername(name);
//		return null;
//	}
//
//}