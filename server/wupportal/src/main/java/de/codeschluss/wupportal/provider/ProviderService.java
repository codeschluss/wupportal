package de.codeschluss.wupportal.provider;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.organisation.OrganisationEntity;
import de.codeschluss.wupportal.organisation.OrganisationService;
import de.codeschluss.wupportal.user.UserEntity;

@Service
public class ProviderService extends DataService<ProviderEntity> {
	
	private OrganisationService orgaService;
	
	public ProviderService(
			ProviderRepository providerRepo,
			OrganisationService orgaService) {
		super(providerRepo);
		this.orgaService = orgaService;
	}
	
	public List<ProviderEntity> getProvidersByUser(UserEntity user, Sort sort) {
		return getRepo().findByUser(user, sort).orElseThrow(() -> new NotFoundException(user.getId()));
	}
	
	public List<ProviderEntity> getProvidersByUser(String userId) {
		return getRepo().findByUserId(userId).orElseThrow(() -> new NotFoundException(userId));
	}

	public List<ProviderEntity> getApprovedProviders(UserEntity user) {
		return getRepo().findByUserAndApprovedTrue(user).orElse(Collections.emptyList());
	}

	public List<ProviderEntity> getOrgaAdminProviders(UserEntity user) {
		return getRepo().findByUserAndAdminTrue(user).orElse(Collections.emptyList());
	}

	public List<ProviderEntity> createProviders(UserEntity user, String... organisationIds) {
		return Arrays.asList(organisationIds).stream().map(orgaId -> {
			checkIfNullOrEmpty(orgaId);
			return createProvider(
					orgaService.getById(orgaId), 
					user);
		}).collect(Collectors.toList());
	}
	
	private void checkIfNullOrEmpty(String id) {
		if (id == null || id.isEmpty()) throw new NullPointerException("id is null or empty");
	}

	private ProviderEntity createProvider(OrganisationEntity orga, UserEntity user) {
		return new ProviderEntity(false, false, null, orga, user);
	}
	
	public void deleteForUserAndOrga(String userId, String orgaId) {
		repo.delete(getProviderByUserAndOrga(userId, orgaId));
	}
	
	public ProviderEntity getProviderByUserAndOrga(String userId, String orgaId) {
		return getRepo().findByUserIdAndOrganisationId(userId, orgaId).orElseThrow(() -> new NotFoundException(userId + " and " + orgaId ));
	}
	
	public ProviderRepository getRepo() {
		if (repo instanceof ProviderRepository) {
			return (ProviderRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + ProviderRepository.class.getName());
		}
	}


}
