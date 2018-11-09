package de.codeschluss.portal.functional.activity;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.address.AddressEntity;
import de.codeschluss.portal.functional.category.CategoryEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.schedule.ScheduleEntity;
import de.codeschluss.portal.functional.tag.TagEntity;
import de.codeschluss.portal.functional.targetgroup.TargetGroupEntity;

@Service
public class ActivityService extends DataService<ActivityEntity, ActivityRepository> {

	public ActivityService(
			ActivityRepository repo,
			ActivityResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	@Override
	public ActivityEntity getDuplicate(ActivityEntity activity) {
		return repo.findByName(activity.getName()).orElse(null);
	}
	
	public Resources<?> getResourcesByProviders(List<ProviderEntity> providers, ResponseEntity<?> responseEntity) {
		return assembler.entitiesToResources(getByProviders(providers), responseEntity);
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

	public ActivityEntity updateAddress(String activityId, AddressEntity address) {
		ActivityEntity activity = getById(activityId);
		activity.setAddress(address);
		return repo.save(activity);		
	}

	public ActivityEntity updateCategory(String activityId, CategoryEntity category) {
		ActivityEntity activity = getById(activityId);
		activity.setCategory(category);
		return repo.save(activity);	
	}

	public boolean isTagDuplicate(String activityId, List<String> tagIds) {
		ActivityEntity activity = getById(activityId);
		return activity.getTags().stream().anyMatch(tag -> tagIds.contains(tag.getId()));
	}

	public List<TagEntity> addTags(String activityId, List<TagEntity> tags) {
		ActivityEntity activity = getById(activityId);
		activity.getTags().addAll(tags);
		return repo.save(activity).getTags();
	}
	
	public void deleteTag(String activityId, String tagId) {
		ActivityEntity activity = getById(activityId);
		activity.getTags().removeIf(tag -> tag.getId().equals(tagId));
		repo.save(activity);	
	}

	public boolean isTargetGroupDuplicate(String activityId, List<String> targetGroupIds) {
		ActivityEntity activity = getById(activityId);
		return activity.getTargetGroups().stream().anyMatch(targetGroup -> targetGroupIds.contains(targetGroup.getId()));
	}

	public List<TargetGroupEntity> addTargetGroups(String activityId, List<TargetGroupEntity> targetGroups) {
		ActivityEntity activity = getById(activityId);
		activity.getTargetGroups().addAll(targetGroups);
		return repo.save(activity).getTargetGroups();
	}

	public void deleteTargetGroup(String activityId, String targetGroupId) {
		ActivityEntity activity = getById(activityId);
		activity.getTargetGroups().removeIf(targetGroup -> targetGroup.getId().equals(targetGroupId));
		repo.save(activity);	
	}

	public boolean isScheduleDuplicate(String activityId, List<String> scheduleIds) {
		ActivityEntity activity = getById(activityId);
		return activity.getSchedules().stream().anyMatch(schedule -> scheduleIds.contains(schedule.getId()));
	}

	public List<ScheduleEntity> addSchedules(String activityId, List<ScheduleEntity> schedules) {
		ActivityEntity activity = getById(activityId);
		activity.getSchedules().addAll(schedules);
		return repo.save(activity).getSchedules();
	}

	public void deleteSchedule(String activityId, String scheduleId) {
		ActivityEntity activity = getById(activityId);
		activity.getSchedules().removeIf(schedule -> schedule.getId().equals(scheduleId));
		repo.save(activity);
	}
}
