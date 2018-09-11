package de.codeschluss.wupportal.user;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;

@Service
public class UserService implements DataService<UserEntity> {
	
	private final UserRepository repo;
	
	public UserService(UserRepository userRepo) {
		this.repo = userRepo;
	}
	
	public List<UserEntity> getSorted(String filter, Sort sort) {
		return filter == null
				? repo.findAll()
				: repo.findFiltered(filter, sort).orElseThrow(() -> new NotFoundException(filter));
	}
	
	public Page<UserEntity> getPaged(String filter, PageRequest pageRequest) {
		return filter == null 
				? repo.findAll(pageRequest)
				: repo.findFiltered(filter, pageRequest).orElseThrow(() -> new NotFoundException(filter));
	}
	
	public UserEntity getById(String id) {
		return repo.findById(id).orElseThrow(() -> new NotFoundException(id));
	}

	public UserEntity add(UserEntity newUser) {
		return repo.save(newUser);
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
			return repo.save(newUser);
		});
	}

	public void delete(String id) {
		repo.deleteById(id);
	}
}
