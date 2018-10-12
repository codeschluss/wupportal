package de.codeschluss.wupportal.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;

@Service
public class UserService extends DataService<UserEntity> {
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public UserService(UserRepository userRepo, BCryptPasswordEncoder encoder) {
		super(userRepo);
		this.bCryptPasswordEncoder = encoder;
	}
	
	public UserEntity add(UserEntity newUser) {
		newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
		return repo.save(newUser);
	}

	public UserEntity update(String id, UserEntity newUser) {
		return repo.findById(id).map(user -> {
			user.setUsername(newUser.getUsername());
			user.setFullname(newUser.getFullname());
			user.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			user.setPhone(newUser.getPhone());
			return repo.save(user);
		}).orElseGet(() -> {
			newUser.setId(id);
			return add(newUser);
		});
	}
	
	public UserEntity getUser(String username) {
		return ((UserRepository) this.repo).findByUsername(username).orElseThrow(() -> new NotFoundException(username));
	}
}
