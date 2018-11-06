package de.codeschluss.portal.functional.provider;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.organisation.OrganisationService;
import de.codeschluss.portal.functional.user.UserEntity;

@Service
public class ProviderService {
	
	private final OrganisationService orgaService;
	private final ProviderRepository repo;
	
	public ProviderService(
			ProviderRepository providerRepo,
			OrganisationService orgaService) {
		this.repo = providerRepo;
		this.orgaService = orgaService;
	}
	
	public List<ProviderEntity> getProvidersByUser(String userId) {
		return getRepo().findByUserId(userId).orElseThrow(() -> new NotFoundException(userId));
	}
	
	public List<ProviderEntity> getProvidersByOrganisation(String orgaId) {
		return getRepo().findByOrganisationId(orgaId).orElseThrow(() -> new NotFoundException(orgaId));
	}

	public List<ProviderEntity> getApprovedProviders(UserEntity user) {
		return getRepo().findByUserAndApprovedTrue(user).orElse(Collections.emptyList());
	}

	public List<ProviderEntity> getOrgaAdminProviders(UserEntity user) {
		return getRepo().findByUserAndAdminTrue(user).orElse(Collections.emptyList());
	}
	
	public ProviderEntity getProviderByUserAndOrganisation(String userId, String orgaId) {
		return getRepo().findByUserIdAndOrganisationId(userId, orgaId).orElseThrow(() -> new NotFoundException(userId + " and " + orgaId ));
	}

	public List<ProviderEntity> createProviders(UserEntity user, List<String> organisationIds) {
		return organisationIds.stream().map(orgaId -> {
			checkIfNullOrEmpty(orgaId);
			return createProvider(
					orgaService.getById(orgaId), 
					user);
		}).collect(Collectors.toList());
	}
	
	private void checkIfNullOrEmpty(String id) {
		if (id == null || id.isEmpty()) throw new NullPointerException("id is null or empty");
	}

	public ProviderEntity createProvider(OrganisationEntity orga, UserEntity user) {
		return new ProviderEntity(false, false, null, orga, user);
	}
	
	public void deleteForUserAndOrga(String userId, String orgaId) {
		repo.delete(getProviderByUserAndOrganisation(userId, orgaId));
	}
	
	public boolean isDuplicate(String userId, List<String> orgaIds) {
		return repo.existsByUserIdAndOrganisationIdIn(userId, orgaIds);
	}

	public List<ProviderEntity> addAll(List<ProviderEntity> providers) {
		return repo.saveAll(providers);
	}

	public void setApprovedByUserAndOrga(String userId, String orgaId, boolean isApproved) {
		ProviderEntity provider = getProviderByUserAndOrganisation(userId, orgaId);
		provider.setApproved(isApproved);
		getRepo().save(provider);
	}
	
	public void setAdminByUserAndOrga(String userId, String orgaId, Boolean isAdmin) {
		ProviderEntity provider = getProviderByUserAndOrganisation(userId, orgaId);
		provider.setAdmin(isAdmin);
		getRepo().save(provider);
	}
	
	public ProviderRepository getRepo() {
		if (repo instanceof ProviderRepository) {
			return (ProviderRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + ProviderRepository.class.getName());
		}
	}
}
