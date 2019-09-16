package de.codeschluss.portal.components.activity;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.components.category.CategoryEntity;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.io.IOException;
import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ActivityService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ActivityService extends ResourceDataService<ActivityEntity, ActivityQueryBuilder> {

  /**
   * Instantiates a new activity service.
   *
   * @param repo the repo
   * @param entities the entities
   * @param assembler the assembler
   */
  public ActivityService(
      ActivityRepository repo, 
      ActivityQueryBuilder entities,
      PagingAndSortingAssembler assembler) {
    super(repo, entities, assembler);
  }

  @Override
  public ActivityEntity getExisting(ActivityEntity activity) {
    return repo.findById(activity.getId()).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(ActivityEntity newActivity) {
    return newActivity.getName() != null && !newActivity.getName().isEmpty()
        && newActivity.getAddressId() != null && !newActivity.getAddressId().isEmpty()
        && newActivity.getCategoryId() != null && !newActivity.getCategoryId().isEmpty()
        && newActivity.getOrganisationId() != null && !newActivity.getOrganisationId().isEmpty()
        && validContactData(newActivity);
  }
  
  @Override
  public boolean validUpdateFieldConstraints(ActivityEntity newActivity) {
    return newActivity.getName() != null && !newActivity.getName().isEmpty()
        && validContactData(newActivity);
  }

  /**
   * Valid contact data.
   *
   * @param newActivity the new activity
   * @return true, if successful
   */
  private boolean validContactData(ActivityEntity newActivity) {
    return (newActivity.getMail() != null && !newActivity.getMail().isEmpty())
        || (newActivity.getPhone() != null && !newActivity.getPhone().isEmpty());
  }

  /**
   * Gets the resources by providers.
   *
   * @param providers the providers
   * @return the resources by providers
   * @throws JsonParseException the json parse exception
   * @throws JsonMappingException the json mapping exception
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public Resources<?> getResourcesByProviders(List<ProviderEntity> providers, BaseParams params) 
      throws JsonParseException, JsonMappingException, IOException {
    return assembler.entitiesToResources(getByProviders(providers, params), params);
  }

  /**
   * Gets the by providers.
   *
   * @param providers the providers
   * @param params the params
   * @return the by providers
   */
  public List<ActivityEntity> getByProviders(List<ProviderEntity> providers, BaseParams params) {
    Predicate query = entities.withAnyOfProviders(providers);
    List<ActivityEntity> result = params == null
        ? repo.findAll(query)
        : repo.findAll(query, entities.createSort(params));
    
    if (result == null || result.isEmpty()) {
      throw new NotFoundException(providers.toString());
    }
    return result;
  }
  
  public List<ActivityEntity> getByUser(UserEntity user) {
    return repo.findAll(entities.forUser(user.getId()));
  }

  /**
   * Checks if is activity for provider.
   *
   * @param activityId
   *          the activity id
   * @param providers
   *          the providers
   * @return true, if is activity for provider
   */
  public boolean isActivityForProvider(String activityId, List<ProviderEntity> providers) {
    return repo.exists(entities.forIdWithAnyOfProviders(activityId, providers));
  }

  @Override
  public ActivityEntity update(String id, ActivityEntity newActivity) {
    return repo.findById(id).map(activity -> {
      activity.setName(newActivity.getName());
      activity.setDescription(newActivity.getDescription());
      activity.setContactName(newActivity.getContactName());
      activity.setPhone(newActivity.getPhone());
      activity.setMail(newActivity.getMail());
      return repo.save(activity);
    }).orElseGet(() -> {
      newActivity.setId(id);
      return repo.save(newActivity);
    });
  }

  /**
   * Update address.
   *
   * @param activityId
   *          the activity id
   * @param address
   *          the address
   * @return the address entity
   */
  public AddressEntity updateAddress(String activityId, AddressEntity address) {
    ActivityEntity activity = getById(activityId);
    activity.setAddress(address);
    return repo.save(activity).getAddress();
  }

  /**
   * Update category.
   *
   * @param activityId
   *          the activity id
   * @param category
   *          the category
   * @return the activity entity
   */
  public ActivityEntity updateCategory(String activityId, CategoryEntity category) {
    ActivityEntity activity = getById(activityId);
    activity.setCategory(category);
    return repo.save(activity);
  }

  /**
   * Update provider.
   *
   * @param activityId
   *          the activity id
   * @param provider
   *          the provider
   * @return the activity entity
   */
  public ActivityEntity updateProvider(String activityId, ProviderEntity provider) {
    ActivityEntity activity = getById(activityId);
    activity.setProvider(provider);
    return repo.save(activity);
  }

  /**
   * Adds the tags.
   *
   * @param activityId
   *          the activity id
   * @param tags
   *          the tags
   * @return the list
   */
  public List<TagEntity> addTags(String activityId, List<TagEntity> tags) {
    ActivityEntity activity = getById(activityId);
    tags.stream().forEach(tagToAdd -> {
      if (activity.getTags().stream().noneMatch(tag -> tag.getId().equals(tagToAdd.getId()))) {
        activity.getTags().add(tagToAdd);
      }
    });
    return repo.save(activity).getTags();
  }

  /**
   * Delete tags.
   *
   * @param activityId
   *          the activity id
   * @param tagIds
   *          the tag ids
   */
  public void deleteTags(String activityId, List<String> tagIds) {
    ActivityEntity activity = getById(activityId);
    activity.getTags().removeIf(tag -> tagIds.contains(tag.getId()));
    repo.save(activity);
  }

  /**
   * Adds the target groups.
   *
   * @param activityId
   *          the activity id
   * @param targetGroups
   *          the target groups
   * @return the list
   */
  public List<TargetGroupEntity> addTargetGroups(String activityId,
      List<TargetGroupEntity> targetGroups) {
    ActivityEntity activity = getById(activityId);
    targetGroups.stream().forEach(targetGroupToAdd -> {
      if (activity.getTargetGroups().stream()
          .noneMatch(targetGroup -> targetGroup.getId().equals(targetGroupToAdd.getId()))) {
        activity.getTargetGroups().add(targetGroupToAdd);
      }
    });
    return repo.save(activity).getTargetGroups();
  }

  /**
   * Delete target group.
   *
   * @param activityId
   *          the activity id
   * @param targetGroupIds
   *          the target group ids
   */
  public void deleteTargetGroup(String activityId, List<String> targetGroupIds) {
    ActivityEntity activity = getById(activityId);
    activity.getTargetGroups()
        .removeIf(targetGroup -> targetGroupIds.contains(targetGroup.getId()));
    // TODO: Check if target groups are nullable and throw exception if last target
    // group is deleted
    repo.save(activity);
  }

  /**
   * Delete all by providers.
   *
   * @param providers the providers
   */
  public void deleteAllByProviders(List<ProviderEntity> providers) {
    List<ActivityEntity> activitiesToDelete = getByProviders(providers, null);
    repo.deleteAll(activitiesToDelete);
  }
}
