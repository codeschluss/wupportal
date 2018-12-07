package de.codeschluss.portal.components.activity;

import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.components.category.CategoryEntity;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.schedule.ScheduleEntity;
import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;
import de.codeschluss.portal.core.api.ResourceDataService;
import de.codeschluss.portal.core.exception.NotFoundException;

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

  /** The default sort prop. */
  protected final String defaultSortProp = "id";

  /**
   * Instantiates a new activity service.
   *
   * @param repo          the repo
   * @param entities the entities
   * @param assembler          the assembler
   */
  public ActivityService(
      ActivityRepository repo, 
      ActivityQueryBuilder entities,
      ActivityResourceAssembler assembler) {
    super(repo, entities, assembler);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.service.DataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  @Override
  public ActivityEntity getExisting(ActivityEntity activity) {
    return repo.findOne(entities.withId(activity.getId())).orElse(null);
  }

  /**
   * Gets the resources by providers.
   *
   * @param providers
   *          the providers
   * @return the resources by providers
   */
  public Resources<?> getResourcesByProviders(List<ProviderEntity> providers) {
    return assembler.entitiesToResources(getByProviders(providers), null);
  }

  /**
   * Gets the by providers.
   *
   * @param providers
   *          the providers
   * @return the by providers
   */
  public List<ActivityEntity> getByProviders(List<ProviderEntity> providers) {
    List<ActivityEntity> result = repo.findAll(entities.withAnyOfProviders(providers));
    
    if (result == null || result.isEmpty()) {
      throw new NotFoundException(providers.toString());
    }
    return result;
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

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.service.DataService#update(java.lang.String,
   * de.codeschluss.portal.core.service.BaseEntity)
   */
  @Override
  public ActivityEntity update(String id, ActivityEntity newActivity) {
    return repo.findById(id).map(activity -> {
      activity.setName(newActivity.getName());
      activity.setDescription(newActivity.getDescription());
      activity.setShowUser(newActivity.isShowUser());
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
   * Adds the schedules.
   *
   * @param activityId
   *          the activity id
   * @param schedules
   *          the schedules
   * @return the list
   */
  public List<ScheduleEntity> addSchedules(String activityId, List<ScheduleEntity> schedules) {
    ActivityEntity activity = getById(activityId);
    schedules.stream().forEach(scheduleToAdd -> {
      if (activity.getSchedules().stream()
          .noneMatch(schedule -> schedule.getId().equals(scheduleToAdd.getId()))) {
        activity.getSchedules().add(scheduleToAdd);
      }
    });
    return repo.save(activity).getSchedules();
  }

  /**
   * Delete schedule.
   *
   * @param activityId
   *          the activity id
   * @param scheduleIds
   *          the schedule ids
   */
  public void deleteSchedule(String activityId, List<String> scheduleIds) {
    ActivityEntity activity = getById(activityId);
    activity.getSchedules().removeIf(schedule -> scheduleIds.contains(schedule.getId()));
    repo.save(activity);
  }
}
