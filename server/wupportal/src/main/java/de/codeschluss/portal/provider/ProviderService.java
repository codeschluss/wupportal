package de.codeschluss.portal.provider;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.exception.NotFoundException;
import de.codeschluss.portal.organisation.OrganisationEntity;
import de.codeschluss.portal.organisation.OrganisationService;
import de.codeschluss.portal.user.UserEntity;

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
		return repo.findByUserId(userId).orElseThrow(() -> new NotFoundException(userId));
	}

	public List<ProviderEntity> getApprovedProviders(UserEntity user) {
		return repo.findByUserAndApprovedTrue(user).orElse(Collections.emptyList());
	}

	public List<ProviderEntity> getOrgaAdminProviders(UserEntity user) {
		return repo.findByUserAndAdminTrue(user).orElse(Collections.emptyList());
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

	private ProviderEntity createProvider(OrganisationEntity orga, UserEntity user) {
		return new ProviderEntity(false, false, null, orga, user);
	}
	
	public void deleteForUserAndOrga(String userId, String orgaId) {
		repo.delete(getProviderByUserAndOrga(userId, orgaId));
	}
	
	public ProviderEntity getProviderByUserAndOrga(String userId, String orgaId) {
		return repo.findByUserIdAndOrganisationId(userId, orgaId).orElseThrow(() -> new NotFoundException(userId + " and " + orgaId ));
	}
	
	public boolean isDuplicate(String userId, List<String> orgaIds) {
		return repo.existsByUserIdAndOrganisationIdIn(userId, orgaIds);
	}

	public List<ProviderEntity> addAll(List<ProviderEntity> providers) {
		return repo.saveAll(providers);
	}

}
