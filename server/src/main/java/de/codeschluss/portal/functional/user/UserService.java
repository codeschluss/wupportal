package de.codeschluss.portal.functional.user;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.hateoas.Resources;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.mail.MailService;
import de.codeschluss.portal.core.utils.ResourceWithEmbeddable;
import de.codeschluss.portal.functional.provider.ProviderEntity;

@Service
@Transactional
public class UserService extends DataService<UserEntity, UserRepository> {
	
	protected final String DEFAULT_SORT_PROP = "username";
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final MailService mailService;
	
	public UserService(
			UserRepository repo,
			UserResourceAssembler assembler,
			BCryptPasswordEncoder encoder,
			MailService mailService) {
		super(repo, assembler);
		this.bCryptPasswordEncoder = encoder;
		this.mailService = mailService;
	}
	
	public boolean userExists(String username) {
		return repo.existsByUsername(username);
	}
	
	public UserEntity getExisting(UserEntity user) {
		try {
			return getUser(user.getUsername());
		} catch(NotFoundException e) {
			return null;
		}
	}
	
	public UserEntity getUser(String username) {
		return repo.findByUsername(username).orElseThrow(() -> new NotFoundException(username));
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
			return repo.save(newUser);
		});
	}

	public void grantSuperUser(String id, Boolean isSuperuser) {
		UserEntity user = repo.findById(id).orElseThrow(() -> new NotFoundException(id));
		user.setSuperuser(isSuperuser);
		repo.save(user);
	}
	
	public boolean resetPassword(String username) {
		String newPwd = RandomStringUtils.randomAlphanumeric(16);
		UserEntity user = getUser(username);
		user.setPassword(bCryptPasswordEncoder.encode(newPwd));
		
		if (mailService.sendResetPasswordMail(user, newPwd)) {
			repo.save(user);
			return true;
		} else {
			return false;
		}
	}
	
	public Resources<?> convertToResourcesWithProviders(List<ProviderEntity> providers) {
		List<ResourceWithEmbeddable<UserEntity>> result = providers.stream().map(provider -> {
			return assembler.toResourceWithEmbedabble(provider.getUser(), provider, "provider");
		}).collect(Collectors.toList());
		
		return assembler.toListResources(result, null);
	}

	public Object getResourceByProvider(ProviderEntity provider) {
		return assembler.toResource(provider.getUser());
	}

	public List<String> getSuperUserMails() {
		return getSuperUsers().stream().map(user -> user.getUsername()).collect(Collectors.toList());
	}
	
	public List<UserEntity> getSuperUsers() {
		return repo.findBySuperuserTrue();
	}

	public List<String> getMailsByProviders(List<ProviderEntity> adminProviders) {
		return adminProviders.stream().map(provider -> provider.getUser().getUsername()).collect(Collectors.toList());
	}
}
