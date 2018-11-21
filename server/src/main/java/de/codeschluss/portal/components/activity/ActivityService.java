package de.codeschluss.portal.components.activity;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.components.category.CategoryEntity;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.schedule.ScheduleEntity;
import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;
import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * The Class ActivityService.
 */
@Service
@Transactional
public class ActivityService extends DataService<ActivityEntity, QActivityEntity> {

  /** The default sort prop. */
  protected final String defaultSortProp = "name";

  /**
   * Instantiates a new activity service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public ActivityService(
      ActivityRepository repo, 
      ActivityResourceAssembler assembler) {
    super(repo, assembler, QActivityEntity.activityEntity);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#getSortedListResources(de.
   * codeschluss.portal.core.utils.FilterSortPaginate)
   */
  @Override
  public <P extends FilterSortPaginate> Resources<?> getSortedListResources(P p) {
    validateParams(p);

    FilterSortPaginateCurrent params = (FilterSortPaginateCurrent) p;
    String filter = params.getFilter();
    Sort sort = getSort(params);

    List<ActivityEntity> result = params.getCurrent() == null || !params.getCurrent()
        ? getSortedList(filter, sort)
        : getCurrentSortedList(filter, sort);
    return assembler.entitiesToResources(result, params);
  }

  /**
   * Gets the current sorted list.
   *
   * @param filter
   *          the filter
   * @param sort
   *          the sort
   * @return the current sorted list
   */
  private List<ActivityEntity> getCurrentSortedList(String filter, Sort sort) {
    List<ActivityEntity> activities = filter == null 
        ? repo.findAll(isCurrent(), sort)
        : repo.findAll(isCurrent().and(getFilteredPredicate(filter)), sort);
        
    if (activities == null || activities.isEmpty()) {
      throw new NotFoundException(filter);
    }
    
    return activities;
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#getPagedResources(de.
   * codeschluss.portal.core.utils.FilterSortPaginate)
   */
  @Override
  public <P extends FilterSortPaginate> PagedResources<Resource<ActivityEntity>> 
      getPagedResources(P p) {
    validateParams(p);

    FilterSortPaginateCurrent params = (FilterSortPaginateCurrent) p;
    String filter = params.getFilter();
    PageRequest page = PageRequest.of(params.getPage(), params.getSize(), getSort(params));

    Page<ActivityEntity> result = params.getCurrent() 
        ? getCurrentPaged(filter, page)
        : getPaged(filter, page);
    return assembler.entitiesToPagedResources(result, params);
  }

  /**
   * Gets the current paged.
   *
   * @param filter
   *          the filter
   * @param page
   *          the page
   * @return the current paged
   */
  public Page<ActivityEntity> getCurrentPaged(String filter, PageRequest page) {
    Page<ActivityEntity> result = filter == null 
        ? repo.findAll(isCurrent(), page)
        : repo.findAll(getFilteredPredicate(filter), page);
        
    if (result == null || result.isEmpty()) {
      throw new NotFoundException(filter);
    }
    
    return result;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  @Override
  public ActivityEntity getExisting(ActivityEntity activity) {
    return repo.findOne(query.id.eq(activity.getId())).orElse(null);
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
    List<ActivityEntity> result = repo.findAll(query.provider.in(providers));
    
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
    return repo.exists(query.id.eq(activityId).and(query.provider.in(providers)));
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public ActivityEntity update(String id, ActivityEntity newActivity) {
    return repo.findById(id).map(activity -> {
      activity.setDescription(newActivity.getDescription());
      activity.setName(newActivity.getName());
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

  /**
   * Validate params.
   *
   * @param <P>
   *          the generic type
   * @param p
   *          the p
   */
  private <P extends FilterSortPaginate> void validateParams(P p) {
    if (!(p instanceof FilterSortPaginateCurrent)) {
      throw new RuntimeException(
          "Must be of type " + FilterSortPaginateCurrent.class + " but is " + p.getClass());
    }
  }

  @Override
  protected Predicate getFilteredPredicate(String filter) {
    return query.name.likeIgnoreCase(filter)
        .or(query.description.likeIgnoreCase(filter))
        .or(query.address.street.likeIgnoreCase(filter))
        .or(query.address.place.likeIgnoreCase(filter))
        .or(query.address.houseNumber.likeIgnoreCase(filter))
        .or(query.address.postalCode.likeIgnoreCase(filter))
        .or(query.address.suburb.name.likeIgnoreCase(filter))
        .or(query.tags.any().name.likeIgnoreCase(filter))
        .or(query.targetGroups.any().name.likeIgnoreCase(filter))
        .or(query.category.name.likeIgnoreCase(filter));
  }
  
  private BooleanExpression isCurrent() {
    return query.schedules.any().startDate.after(Expressions.currentTimestamp());
  }
}
