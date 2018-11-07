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
import de.codeschluss.portal.functional.tag.TagEntity;

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

	public void deleteTag(String activityId, String tagId) {
		ActivityEntity activity = getById(activityId);
		activity.getTags().removeIf(tag -> tag.getId().equals(tagId));
		repo.save(activity);	
	}

	public boolean isTagDuplicate(String activityId, List<String> tags) {
		ActivityEntity activity = getById(activityId);
		return activity.getTags().stream().anyMatch(tag -> tags.contains(tag.getId()));
	}

	public List<TagEntity> addTags(String activityId, List<TagEntity> tagId) {
		ActivityEntity activity = getById(activityId);
		activity.getTags().addAll(tagId);
		return repo.save(activity).getTags();
	}
}
