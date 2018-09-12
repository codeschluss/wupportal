package de.codeschluss.wupportal.user;

import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;

@Service
public class UserService extends DataService<UserEntity> {
	
	public UserService(UserRepository userRepo) {
		super(userRepo);
	}

	public UserEntity update(String id, UserEntity newUser) {
		return repo.findById(id).map(user -> {
			user.setUsername(newUser.getUsername());
			user.setFullname(newUser.getFullname());
			user.setPassword(newUser.getPassword());
			user.setPhone(newUser.getPhone());
			return repo.save(user);
		}).orElseGet(() -> {
			newUser.setId(id);
			return add(newUser);
		});
	}
}
