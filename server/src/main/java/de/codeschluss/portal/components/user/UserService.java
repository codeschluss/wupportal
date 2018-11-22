package de.codeschluss.portal.components.user;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.mail.MailService;
import de.codeschluss.portal.core.utils.ResourceWithEmbeddable;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.hateoas.Resources;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * The Class UserService.
 */
@Service
@Transactional
public class UserService extends DataService<UserEntity> {

  /** The default sort prop. */
  protected final String defaultSortProp = "username";

  /** The bcrypt password encoder. */
  private final BCryptPasswordEncoder bcryptPasswordEncoder;

  /** The mail service. */
  private final MailService mailService;
  
  private final UserQueryBuilder queryBuilder;

  /**
   * Instantiates a new user service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   * @param encoder
   *          the encoder
   * @param mailService
   *          the mail service
   */
  public UserService(
      UserRepository repo, 
      UserResourceAssembler assembler,
      BCryptPasswordEncoder encoder, 
      MailService mailService,
      UserQueryBuilder queryBuilder) {
    super(repo, assembler);
    this.bcryptPasswordEncoder = encoder;
    this.mailService = mailService;
    this.queryBuilder = queryBuilder;
  }

  /**
   * User exists.
   *
   * @param username
   *          the username
   * @return true, if successful
   */
  public boolean userExists(String username) {
    return repo.exists(queryBuilder.isUsername(username));
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  @Override
  public UserEntity getExisting(UserEntity user) {
    try {
      return getUser(user.getUsername());
    } catch (NotFoundException e) {
      return null;
    }
  }

  /**
   * Gets the user.
   *
   * @param username
   *          the username
   * @return the user
   */
  public UserEntity getUser(String username) {
    return repo.findOne(queryBuilder.isUsername(username))
        .orElseThrow(() -> new NotFoundException(username));
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#add(de.codeschluss.portal.core.
   * common.BaseEntity)
   */
  @Override
  public UserEntity add(UserEntity newUser) {
    newUser.setPassword(bcryptPasswordEncoder.encode(newUser.getPassword()));
    return repo.save(newUser);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public UserEntity update(String id, UserEntity newUser) {
    return repo.findById(id).map(user -> {
      user.setUsername(newUser.getUsername());
      user.setFullname(newUser.getFullname());
      user.setPassword(bcryptPasswordEncoder.encode(newUser.getPassword()));
      user.setPhone(newUser.getPhone());
      return repo.save(user);
    }).orElseGet(() -> {
      newUser.setId(id);
      return repo.save(newUser);
    });
  }

  /**
   * Grant super user.
   *
   * @param id
   *          the id
   * @param isSuperuser
   *          the is superuser
   */
  public void grantSuperUser(String id, Boolean isSuperuser) {
    UserEntity user = repo.findById(id).orElseThrow(() -> new NotFoundException(id));
    user.setSuperuser(isSuperuser);
    repo.save(user);
  }

  /**
   * Reset password.
   *
   * @param username
   *          the username
   * @return true, if successful
   */
  public boolean resetPassword(String username) {
    String newPwd = RandomStringUtils.randomAlphanumeric(16);
    UserEntity user = getUser(username);
    user.setPassword(bcryptPasswordEncoder.encode(newPwd));

    if (mailService.sendResetPasswordMail(user, newPwd)) {
      repo.save(user);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Convert to resources with providers.
   *
   * @param providers
   *          the providers
   * @return the resources
   */
  public Resources<?> convertToResourcesWithProviders(List<ProviderEntity> providers) {
    List<ResourceWithEmbeddable<UserEntity>> result = providers.stream().map(provider -> {
      return assembler.toResourceWithEmbedabble(provider.getUser(), provider, "provider");
    }).collect(Collectors.toList());

    return assembler.toListResources(result, null);
  }

  /**
   * Gets the resource by provider.
   *
   * @param provider
   *          the provider
   * @return the resource by provider
   */
  public Object getResourceByProvider(ProviderEntity provider) {
    return assembler.toResource(provider.getUser());
  }

  /**
   * Gets the super user mails.
   *
   * @return the super user mails
   */
  public List<String> getSuperUserMails() {
    return getSuperUsers().stream().map(user -> user.getUsername()).collect(Collectors.toList());
  }

  /**
   * Gets the super users.
   *
   * @return the super users
   */
  public List<UserEntity> getSuperUsers() {
    return repo.findAll(queryBuilder.isSuperuser());
  }

  /**
   * Gets the mails by providers.
   *
   * @param adminProviders
   *          the admin providers
   * @return the mails by providers
   */
  public List<String> getMailsByProviders(List<ProviderEntity> adminProviders) {
    return adminProviders.stream().map(provider -> provider.getUser().getUsername())
        .collect(Collectors.toList());
  }

  @Override
  protected Predicate getFilteredPredicate(String filter) {
    filter = prepareFilter(filter);
    return queryBuilder.fuzzySearchQuery(filter);
  }
}
