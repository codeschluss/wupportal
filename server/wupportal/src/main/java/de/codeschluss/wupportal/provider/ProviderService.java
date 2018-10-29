package de.codeschluss.wupportal.provider;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.organisation.OrganisationEntity;
import de.codeschluss.wupportal.organisation.OrganisationService;
import de.codeschluss.wupportal.user.UserEntity;
import de.codeschluss.wupportal.user.UserService;

@Service
public class ProviderService extends DataService<ProviderEntity> {
	
	private OrganisationService orgaService;
	private UserService userService;
	
	public ProviderService(
			ProviderRepository providerRepo,
			OrganisationService orgaService,
			UserService userService) {
		super(providerRepo);
		this.orgaService = orgaService;
		this.userService = userService;
	}
	
	public ProviderEntity update(String id, ProviderTO newProviderTO) {
		return getRepo().findById(id).map(provider -> {
			provider.setUser(userService.getById(newProviderTO.getUserId()));
			provider.setOrganisation(orgaService.getById(newProviderTO.getOrganisationId()));
			return getRepo().save(provider);
		}).orElseGet(() -> {
			ProviderEntity provider = createProvider(
					orgaService.getById(newProviderTO.getOrganisationId()),
					userService.getById(newProviderTO.getUserId()));
			provider.setId(id);
			return add(provider);
		});
	}
	
	public Page<ProviderEntity> getPagedProvidersByUser(UserEntity user, PageRequest page) {
		return getRepo().findByUser(user, page).orElseThrow(() -> new NotFoundException(user.getId()));
	}
	
	public List<ProviderEntity> getProvidersByUser(UserEntity user, Sort sort) {
		return getRepo().findByUser(user, sort).orElseThrow(() -> new NotFoundException(user.getId()));
	}
	
	public List<ProviderEntity> getProvidersByUser(String userId, Sort sort) {
		return getRepo().findByUserid(userId, sort).orElseThrow(() -> new NotFoundException(userId));
	}
	
	public List<ProviderEntity> getProvidersByUser(String userId) {
		return getRepo().findByUserid(userId).orElseThrow(() -> new NotFoundException(userId));
	}

	public List<ProviderEntity> getApprovedProviders(UserEntity user) {
		return getRepo().findByUserAndApprovedTrue(user).orElse(Collections.emptyList());
	}

	public List<ProviderEntity> getOrgaAdminProviders(UserEntity user) {
		return getRepo().findByUserAndAdminTrue(user).orElse(Collections.emptyList());
	}

	public List<ProviderEntity> mapForUser(ProviderTO[] transferObjects, UserEntity user) {
		return Arrays.asList(transferObjects).stream().map(to -> {
			checkIfNullOrEmpty(to.getOrganisationId());
			return createProvider(
					orgaService.getById(to.getOrganisationId()), 
					user);
		}).collect(Collectors.toList());
	}

	public List<ProviderEntity> mapForOrganisation(ProviderTO[] transferObjects, OrganisationEntity organisation) {
		return Arrays.asList(transferObjects).stream().map(to -> {
			checkIfNullOrEmpty(to.getUserId());
			return createProvider(
					organisation, 
					userService.getById(to.getUserId()));
		}).collect(Collectors.toList());
	}
	
	private void checkIfNullOrEmpty(String id) {
		if (id == null || id.isEmpty()) throw new NullPointerException("id is null or empty");
	}

	private ProviderEntity createProvider(OrganisationEntity orga, UserEntity user) {
		return new ProviderEntity(false, false, null, orga, user);
	}
	
	public boolean isProviderForUser(String userId, String providerId) {
		return getById(providerId).getUser().getId().equals(userId);
	}
	
	public ProviderRepository getRepo() {
		if (repo instanceof ProviderRepository) {
			return (ProviderRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + ProviderRepository.class.getName());
		}
	}


}
