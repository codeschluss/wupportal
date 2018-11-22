package de.codeschluss.portal.components.provider;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.mail.MailService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * The Class ProviderService.
 */
@Service
@Transactional
public class ProviderService {

  /** The orga service. */
  private final OrganisationService orgaService;

  /** The repo. */
  private final ProviderRepository repo;

  /** The mail service. */
  private final MailService mailService;

  /** The user service. */
  private final UserService userService;
  
  private final QProviderEntity query;

  /**
   * Instantiates a new provider service.
   *
   * @param providerRepo
   *          the provider repo
   * @param orgaService
   *          the orga service
   * @param mailService
   *          the mail service
   * @param userService
   *          the user service
   */
  public ProviderService(
      ProviderRepository providerRepo, 
      OrganisationService orgaService,
      UserService userService,
      MailService mailService, 
      QProviderEntity query) {
    this.repo = providerRepo;
    this.orgaService = orgaService;
    this.mailService = mailService;
    this.userService = userService;
    this.query = query;
  }

  /**
   * Checks if is duplicate.
   *
   * @param userId
   *          the user id
   * @param orgaIds
   *          the orga ids
   * @return true, if is duplicate
   */
  public boolean isDuplicate(String userId, List<String> orgaIds) {
    return repo.exists(
        query.user.id.eq(userId).and(query.organisation.id.in(orgaIds)));
  }

  /**
   * Gets the providers by user.
   *
   * @param userId
   *          the user id
   * @return the providers by user
   */
  public List<ProviderEntity> getProvidersByUser(String userId) {
    List<ProviderEntity> result = repo.findAll(query.user.id.eq(userId));
    
    if (result == null || result.isEmpty()) {
      throw new NotFoundException(userId);
    }
    
    return result;
  }

  /**
   * Gets the providers by organisation.
   *
   * @param orgaId
   *          the orga id
   * @return the providers by organisation
   */
  public List<ProviderEntity> getProvidersByOrganisation(String orgaId) {
    List<ProviderEntity> result = repo.findAll(query.organisation.id.eq(orgaId));
    
    if (result == null || result.isEmpty()) {
      throw new NotFoundException(orgaId);
    }
    
    return result;
  }
  
  /**
   * Gets the approved providers.
   *
   * @param user
   *          the user
   * @return the approved providers
   */
  public List<ProviderEntity> getApprovedProviders(UserEntity user) {
    List<ProviderEntity> result = repo.findAll(query.user.eq(user).and(query.approved.isTrue()));
    
    if (result == null || result.isEmpty()) {
      return Collections.emptyList();
    }
    
    return result;
  }
  
  /**
   * Gets the orga admin providers.
   *
   * @param user
   *          the user
   * @return the orga admin providers
   */
  public List<ProviderEntity> getOrgaAdminProviders(UserEntity user) {
    List<ProviderEntity> result = repo.findAll(query.user.eq(user).and(query.admin.isTrue()));
    
    if (result == null || result.isEmpty()) {
      return Collections.emptyList();
    }
    
    return result;
  }
  
  /**
  * Gets the admin users.
  *
  * @param organisation
  *          the organisation
  * @return the admin users
  */
  public List<ProviderEntity> getOrgaAdminProviders(OrganisationEntity organisation) {
    return repo.findAll(query.organisation.eq(organisation).and(query.admin.isTrue()));
  }

  /**
   * Gets the providers by activity.
   *
   * @param activityId
   *          the activity id
   * @return the providers by activity
   */
  public ProviderEntity getProviderByActivity(String activityId) {
    return repo.findOne(query.activities.any().id.eq(activityId))
        .orElseThrow(() -> new NotFoundException(activityId));
  }

  /**
   * Gets the provider by user and organisation.
   *
   * @param userId
   *          the user id
   * @param orgaId
   *          the orga id
   * @return the provider by user and organisation
   */
  public ProviderEntity getProviderByUserAndOrganisation(String userId, String orgaId) {
    return repo.findOne(query.user.id.eq(userId).and(query.organisation.id.eq(orgaId)))
        .orElseThrow(() -> new NotFoundException(userId + " and " + orgaId));        
  }

  /**
   * Creates the providers.
   *
   * @param user
   *          the user
   * @param organisationIds
   *          the organisation ids
   * @return the list
   */
  public List<ProviderEntity> createProviders(UserEntity user, List<String> organisationIds) {
    return organisationIds.stream().map(orgaId -> {
      checkIfNullOrEmpty(orgaId);
      return createProvider(orgaService.getById(orgaId), user);
    }).collect(Collectors.toList());
  }

  /**
   * Check if null or empty.
   *
   * @param id
   *          the id
   */
  private void checkIfNullOrEmpty(String id) {
    if (id == null || id.isEmpty()) {
      throw new NullPointerException("id is null or empty");
    }
  }

  /**
   * Creates the provider.
   *
   * @param orga
   *          the orga
   * @param user
   *          the user
   * @return the provider entity
   */
  public ProviderEntity createProvider(OrganisationEntity orga, UserEntity user) {
    return new ProviderEntity(false, false, null, orga, user);
  }

  /**
   * Delete for user and orga.
   *
   * @param userId
   *          the user id
   * @param orgaId
   *          the orga id
   */
  public void deleteForUserAndOrga(String userId, String orgaId) {
    repo.delete(getProviderByUserAndOrganisation(userId, orgaId));
  }

  /**
   * Adds the all and sends mail.
   *
   * @param providers
   *          the providers
   * @return the list
   */
  public List<ProviderEntity> addAllWithMail(List<ProviderEntity> providers) {
    return providers.stream().map(provider -> {
      provider = repo.save(provider);
      sendApplicationMail(provider);
      return provider;
    }).collect(Collectors.toList());
  }

  /**
   * Send application mail.
   *
   * @param provider
   *          the provider
   */
  private void sendApplicationMail(ProviderEntity provider) {
    List<ProviderEntity> adminProviders = getOrgaAdminProviders(provider.getOrganisation());
    List<String> toMails = adminProviders == null || adminProviders.isEmpty()
        ? userService.getSuperUserMails()
        : userService.getMailsByProviders(adminProviders);
    mailService.sendApplicationUserMail(provider, toMails);
  }

  /**
   * Sets the approved by user and orga.
   *
   * @param userId
   *          the user id
   * @param orgaId
   *          the orga id
   * @param isApproved
   *          the is approved
   */
  public void setApprovedByUserAndOrga(String userId, String orgaId, boolean isApproved) {
    ProviderEntity provider = getProviderByUserAndOrganisation(userId, orgaId);
    provider.setApproved(isApproved);

    if (!isApproved) {
      provider.setAdmin(false);
    } else {
      mailService.sendApprovedUserMail(provider);
    }

    repo.save(provider);
  }

  /**
   * Sets the admin by user and orga.
   *
   * @param userId
   *          the user id
   * @param orgaId
   *          the orga id
   * @param isAdmin
   *          the is admin
   */
  public void setAdminByUserAndOrga(String userId, String orgaId, Boolean isAdmin) {
    ProviderEntity provider = getProviderByUserAndOrganisation(userId, orgaId);
    provider.setAdmin(isAdmin);

    if (isAdmin) {
      provider.setApproved(true);
    }

    repo.save(provider);
  }
}
