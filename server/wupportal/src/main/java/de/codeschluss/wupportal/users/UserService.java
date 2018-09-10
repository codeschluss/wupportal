package de.codeschluss.wupportal.users;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.exception.NotFoundException;

@Service
public class UserService {
	
	private final UserRepository userRepo;
	
	public UserService(UserRepository userRepo) {
		this.userRepo = userRepo;
	}
	
	public List<UserEntity> getSortedUsers(String filter, Sort sort) {
		return filter == null
				? userRepo.findFiltered(filter, sort)
				: userRepo.findAll();
	}
	
	public Page<UserEntity> getPagedUsers(String filter, PageRequest pageRequest) {
		return filter == null 
				? userRepo.findAll(pageRequest)
				: userRepo.findFiltered(filter, pageRequest);
	}
	
	public UserEntity getById(String id) {
		return userRepo.findById(id).orElseThrow(() -> new NotFoundException(id));
	}

	public UserEntity add(UserEntity newUser) {
		return userRepo.save(newUser);
	}

	public UserEntity updateUser(String id, UserEntity newUser) {
		return userRepo.findById(id).map(user -> {
			user.setUsername(newUser.getUsername());
			user.setFullname(newUser.getFullname());
			user.setPassword(newUser.getPassword());
			user.setPhone(newUser.getPhone());
			return userRepo.save(user);
		}).orElseGet(() -> {
			newUser.setId(id);
			return userRepo.save(newUser);
		});
	}

	public void delete(String id) {
		userRepo.deleteById(id);
		
	}
}
