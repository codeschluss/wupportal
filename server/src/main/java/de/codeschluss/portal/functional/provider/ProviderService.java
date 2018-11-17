package de.codeschluss.portal.functional.provider;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.mail.MailService;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.organisation.OrganisationService;
import de.codeschluss.portal.functional.user.UserEntity;
import de.codeschluss.portal.functional.user.UserService;

@Service
@Transactional
public class ProviderService {
	
	private final OrganisationService orgaService;
	private final ProviderRepository repo;
	private final MailService mailService;
	private final UserService userService;
	
	public ProviderService(
			ProviderRepository providerRepo,
			OrganisationService orgaService,
			MailService mailService,
			UserService userService) {
		this.repo = providerRepo;
		this.orgaService = orgaService;
		this.mailService = mailService;
		this.userService = userService;
	}
	
	public boolean isDuplicate(String userId, List<String> orgaIds) {
		return repo.existsByUserIdAndOrganisationIdIn(userId, orgaIds);
	}
	
	public List<ProviderEntity> getProvidersByUser(String userId) {
		return repo.findByUserId(userId).orElseThrow(() -> new NotFoundException(userId));
	}
	
	public List<ProviderEntity> getProvidersByOrganisation(String orgaId) {
		return repo.findByOrganisationId(orgaId).orElseThrow(() -> new NotFoundException(orgaId));
	}
	
	public ProviderEntity getProvidersByActivity(String activityId) {
		return repo.findByActivitiesId(activityId).orElseThrow(() -> new NotFoundException(activityId));
	}

	public List<ProviderEntity> getApprovedProviders(UserEntity user) {
		return repo.findByUserAndApprovedTrue(user).orElse(Collections.emptyList());
	}

	public List<ProviderEntity> getOrgaAdminProviders(UserEntity user) {
		return repo.findByUserAndAdminTrue(user).orElse(Collections.emptyList());
	}
	
	public ProviderEntity getProviderByUserAndOrganisation(String userId, String orgaId) {
		return repo.findByUserIdAndOrganisationId(userId, orgaId).orElseThrow(() -> new NotFoundException(userId + " and " + orgaId ));
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

	public List<ProviderEntity> addAll(List<ProviderEntity> providers) {
		return providers.stream().map(provider -> {
			provider = repo.save(provider);
			sendApplicationMail(provider);
			return provider;
		}).collect(Collectors.toList());
	}
	
	private void sendApplicationMail(ProviderEntity provider) {
		List<ProviderEntity> adminProviders = getAdminUsers(provider.getOrganisation());
		List<String> toMails = adminProviders == null || adminProviders.isEmpty()
				? userService.getSuperUserMails()
				: userService.getMailsByProviders(adminProviders);
		mailService.sendApplicationUserMail(provider, toMails);	
	}

	public List<ProviderEntity> getAdminUsers(OrganisationEntity organisation) {
		return repo.findByOrganisationAndAdminTrue(organisation).orElse(null);
	}

	public void setApprovedByUserAndOrga(String userId, String orgaId, boolean isApproved) {
		ProviderEntity provider = getProviderByUserAndOrganisation(userId, orgaId);
		provider.setApproved(isApproved);
		
		if(!isApproved) {
			provider.setAdmin(false);
		} else {
			mailService.sendApprovedUserMail(provider);
		}

		repo.save(provider);
	}

	public void setAdminByUserAndOrga(String userId, String orgaId, Boolean isAdmin) {
		ProviderEntity provider = getProviderByUserAndOrganisation(userId, orgaId);
		provider.setAdmin(isAdmin);
		
		if(isAdmin) {
			provider.setApproved(true);
		}
		
		repo.save(provider);
	}
}
