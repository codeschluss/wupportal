package de.codeschluss.wupportal.services;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import de.codeschluss.wupportal.repository.IUserRepository;


@Component
public class UserDetailService implements UserDetailsService {

	private IUserRepository userRepository;

	public UserDetailService(IUserRepository repository) {
		this.userRepository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		de.codeschluss.wupportal.model.User user = userRepository.findByUsername(name);
		return new User(user.getUsername(), user.getPassword(),
				AuthorityUtils.createAuthorityList(user.getRoles()));
	}
	
}