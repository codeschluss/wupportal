package de.codeschluss.portal.components.provider;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.mail.MailService;
import de.codeschluss.portal.core.service.DataService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.NotImplementedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * The Class ProviderService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
@Transactional
public class ProviderService extends DataService<ProviderEntity, ProviderQueryBuilder> {

  /** The orga service. */
  private final OrganisationService orgaService;

  /** The mail service. */
  private final MailService mailService;

  /** The user service. */
  private final UserService userService;

  /**
   * Instantiates a new provider service.
   *
   * @param repo
   *          the provider repo
   * @param orgaService
   *          the orga service
   * @param mailService
   *          the mail service
   * @param userService
   *          the user service
   */
  public ProviderService(
      ProviderRepository repo, 
      ProviderQueryBuilder entities,
      OrganisationService orgaService,
      UserService userService,
      MailService mailService) {
    super(repo, entities);
    this.orgaService = orgaService;
    this.mailService = mailService;
    this.userService = userService;
  }
  
  @Override
  public ProviderEntity getExisting(ProviderEntity provider) {
    String userId = provider.getUser().getId();
    String orgaId = provider.getOrganisation().getId();
    
    return repo
        .findOne(entities.withUserIdAndOrgaId(userId, orgaId))
        .orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(ProviderEntity newProvider) {
    return validFields(newProvider);
  }
  
  @Override
  public boolean validUpdateFieldConstraints(ProviderEntity newProvider) {
    return validFields(newProvider);
  }

  /**
   * Valid fields.
   *
   * @param newProvider the new provider
   * @return true, if successful
   */
  private boolean validFields(ProviderEntity newProvider) {
    return newProvider.getOrganisation() != null && newProvider.getUser() != null;
  }

  @Override
  public ProviderEntity update(String id, ProviderEntity updatedEntity) {
    throw new NotImplementedException("For security reasons");
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
    return repo.exists(entities.withUserIdAndAnyOfOrgaIds(userId, orgaIds));
  }

  /**
   * Gets the providers by user.
   *
   * @param userId
   *          the user id
   * @return the providers by user
   */
  public List<ProviderEntity> getProvidersByUser(String userId) {
    List<ProviderEntity> result = repo.findAll(entities.withUserId(userId));
    
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
    List<ProviderEntity> result = repo.findAll(entities.withOrgaId(orgaId));
    
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
    List<ProviderEntity> result = repo.findAll(entities.withApprovedOrgasAndUser(user.getId()));
    
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
    List<ProviderEntity> result = repo.findAll(entities.asOrgaAdmins(user.getId()));
    
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
    return repo.findAll(entities.adminsforOrga(organisation.getId()));
  }

  /**
   * Gets the providers by activity.
   *
   * @param activityId
   *          the activity id
   * @return the providers by activity
   */
  public ProviderEntity getProviderByActivity(String activityId) {
    return repo.findOne(entities.withAnyActivityId(activityId))
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
    return repo.findOne(entities.withUserIdAndOrgaId(userId, orgaId))
        .orElseThrow(() -> new NotFoundException(userId + " and " + orgaId));        
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
    ProviderEntity provider = new ProviderEntity();
    provider.setAdmin(false);
    provider.setApproved(false);
    provider.setOrganisation(orga);
    provider.setUser(user);
    return provider;
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
   * Creates the application.
   *
   * @param user the user
   * @param organisationParam the organisation param
   * @return the list
   */
  public List<ProviderEntity> createApplication(UserEntity user, List<String> organisationParam) {
    List<String> distinctOrgas = organisationParam.stream().distinct()
        .collect(Collectors.toList());

    if (isDuplicate(user.getId(), distinctOrgas)) {
      throw new DuplicateEntryException("User with one or more Organisations already exists");
    }
    
    return addAllResourcesWithMail(createProviders(user, distinctOrgas));
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
  private List<ProviderEntity> createProviders(UserEntity user, List<String> organisationIds) {
    return organisationIds.stream().map(orgaId -> {
      checkIfNullOrEmpty(orgaId);
      return createProvider(orgaService.getById(orgaId), user);
    }).collect(Collectors.toList());
  }

  /**
   * Adds the all and sends mail.
   *
   * @param providers
   *          the providers
   * @return the list
   */
  public List<ProviderEntity> addAllResourcesWithMail(List<ProviderEntity> providers) {
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
   * @param userId the user id
   * @param orgaId the orga id
   */
  public void setApprovedByUserAndOrga(String userId, String orgaId) {
    ProviderEntity provider = getProviderByUserAndOrganisation(userId, orgaId);
    provider.setApproved(true);
    mailService.sendApprovedUserMail(provider);
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

  /**
   * Adds the admin.
   *
   * @param orga the orga
   * @param currentUser the current user
   */
  public void addAdmin(OrganisationEntity orga, UserEntity currentUser) {
    ProviderEntity admin = new ProviderEntity();
    admin.setApproved(true);
    admin.setAdmin(true);
    admin.setOrganisation(orga);
    admin.setUser(currentUser);
    repo.save(admin);
  }
}
