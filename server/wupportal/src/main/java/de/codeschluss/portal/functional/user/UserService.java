package de.codeschluss.portal.functional.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.base.ResourceWithEmbeddable;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.provider.ProviderEntity;

@Service
public class UserService extends DataService<UserEntity> {
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public UserService(
			UserRepository repo,
			UserResourceAssembler assembler,
			BCryptPasswordEncoder encoder) {
		super(repo, assembler);
		this.bCryptPasswordEncoder = encoder;
	}
	
	public boolean userExists(String username) {
		return getRepo().existsByUsername(username);
	}
	
	public UserEntity getUser(String username) {
		return getRepo().findByUsername(username).orElseThrow(() -> new NotFoundException(username));
	}
	
	public UserEntity add(UserEntity newUser) {
		newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
		return getRepo().save(newUser);
	}
	
	public UserEntity update(String id, UserEntity newUser) {
		return getRepo().findById(id).map(user -> {
			user.setUsername(newUser.getUsername());
			user.setFullname(newUser.getFullname());
			user.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			user.setPhone(newUser.getPhone());
			return getRepo().save(user);
		}).orElseGet(() -> {
			newUser.setId(id);
			return getRepo().save(newUser);
		});
	}

	public void grantSuperUser(String id, Boolean isSuperuser) {
		UserEntity user = getRepo().findById(id).orElseThrow(() -> new NotFoundException(id));
		user.setSuperuser(isSuperuser);
		getRepo().save(user);
	}
	
	public Resources<?> convertToResourcesWithProviders(List<ProviderEntity> providers, ResponseEntity<?> responseEntity) {
		List<ResourceWithEmbeddable<UserEntity>> result = providers.stream().map(provider -> {
			return assembler.toResourceWithEmbedabble(provider.getUser(), provider, "provider");
		}).collect(Collectors.toList());
		
		return assembler.toListResources(result, responseEntity);
	}
	
	public UserRepository getRepo() {
		if (repo instanceof UserRepository) {
			return (UserRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + UserRepository.class.getName());
		}
	}
}
