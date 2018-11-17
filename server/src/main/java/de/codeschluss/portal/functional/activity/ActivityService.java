package de.codeschluss.portal.functional.activity;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.address.AddressEntity;
import de.codeschluss.portal.functional.category.CategoryEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.schedule.ScheduleEntity;
import de.codeschluss.portal.functional.tag.TagEntity;
import de.codeschluss.portal.functional.targetgroup.TargetGroupEntity;

@Service
@Transactional
public class ActivityService extends DataService<ActivityEntity, ActivityRepository> {

	protected final String DEFAULT_SORT_PROP = "name";
	
	public ActivityService(
			ActivityRepository repo,
			ActivityResourceAssembler assembler) {
		super(repo, assembler);
	}
	
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

	private List<ActivityEntity> getCurrentSortedList(String filter, Sort sort) {
		return filter == null
				? repo.findCurrent(sort)
				: repo.findCurrentFiltered(filter, sort).orElseThrow(() -> new NotFoundException(filter));
	}

	@Override
	public <P extends FilterSortPaginate> PagedResources<Resource<ActivityEntity>> getPagedResources(P p) {
		validateParams(p);
		
		FilterSortPaginateCurrent params = (FilterSortPaginateCurrent) p; 
		String filter = params.getFilter();
		PageRequest page = PageRequest.of(params.getPage(), params.getSize(), getSort(params));
		
		Page<ActivityEntity> result = params.getCurrent()
				? getCurrentPaged(filter, page)
				: getPaged(filter, page);
		return assembler.entitiesToPagedResources(result, params);
	}
	
	public Page<ActivityEntity> getCurrentPaged(String filter, PageRequest page) {
		return filter == null 
			? repo.findCurrent(page)
			: repo.findFiltered(filter, page).orElseThrow(() -> new NotFoundException(filter));
	}
	
	@Override
	public ActivityEntity getExisting(ActivityEntity activity) {
		return repo.findByName(activity.getName()).orElse(null);
	}
	
	public Resources<?> getResourcesByProviders(List<ProviderEntity> providers) {
		return assembler.entitiesToResources(getByProviders(providers), null);
	}
	
	public List<ActivityEntity> getByProviders(List<ProviderEntity> providers) {
		return repo.findByProviderIn(providers).orElseThrow(() -> new NotFoundException(providers.toString()));
	}

	public boolean isActivityForProvider(String activityId, List<ProviderEntity> providers) {
		return repo.existsByIdAndProviderIn(activityId, providers);
	}
	
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

	public AddressEntity updateAddress(String activityId, AddressEntity address) {
		ActivityEntity activity = getById(activityId);
		activity.setAddress(address);
		return repo.save(activity).getAddress();		
	}

	public ActivityEntity updateCategory(String activityId, CategoryEntity category) {
		ActivityEntity activity = getById(activityId);
		activity.setCategory(category);
		return repo.save(activity);	
	}
	
	public ActivityEntity updateProvider(String activityId, ProviderEntity provider) {
		ActivityEntity activity = getById(activityId);
		activity.setProvider(provider);
		return repo.save(activity);	
	}

	public List<TagEntity> addTags(String activityId, List<TagEntity> tags) {
		ActivityEntity activity = getById(activityId);
		tags.stream().forEach(tagToAdd -> {
			if (activity.getTags().stream().noneMatch(tag -> tag.getId().equals(tagToAdd.getId()))) {
				activity.getTags().add(tagToAdd);
			}
		});
		return repo.save(activity).getTags();
	}
	
	public void deleteTags(String activityId, List<String> tagIds) {
		ActivityEntity activity = getById(activityId);
		activity.getTags().removeIf(tag -> tagIds.contains(tag.getId()));
		repo.save(activity);	
	}

	public List<TargetGroupEntity> addTargetGroups(String activityId, List<TargetGroupEntity> targetGroups) {
		ActivityEntity activity = getById(activityId);
		targetGroups.stream().forEach(targetGroupToAdd -> {
			if (activity.getTargetGroups().stream().noneMatch(targetGroup -> targetGroup.getId().equals(targetGroupToAdd.getId()))) {
				activity.getTargetGroups().add(targetGroupToAdd);
			}
		});
		return repo.save(activity).getTargetGroups();
	}

	public void deleteTargetGroup(String activityId, List<String> targetGroupIds) {
		ActivityEntity activity = getById(activityId);
		activity.getTargetGroups().removeIf(targetGroup -> targetGroupIds.contains(targetGroup.getId()));
		//TODO: Check if target groups are nullable and throw exception if last target group is deleted
		repo.save(activity);	
	}

	public List<ScheduleEntity> addSchedules(String activityId, List<ScheduleEntity> schedules) {
		ActivityEntity activity = getById(activityId);
		schedules.stream().forEach(scheduleToAdd -> {
			if (activity.getSchedules().stream().noneMatch(schedule -> schedule.getId().equals(scheduleToAdd.getId()))) {
				activity.getSchedules().add(scheduleToAdd);
			}
		});
		return repo.save(activity).getSchedules();
	}

	public void deleteSchedule(String activityId, List<String> scheduleIds) {
		ActivityEntity activity = getById(activityId);
		activity.getSchedules().removeIf(schedule -> scheduleIds.contains(schedule.getId()));
		repo.save(activity);
	}
	
	private <P extends FilterSortPaginate> void validateParams(P p) {
		if (!(p instanceof FilterSortPaginateCurrent)) {
			throw new RuntimeException("Must be of type " + FilterSortPaginateCurrent.class + " but is " + p.getClass());
		}
	}
}
