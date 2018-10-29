package de.codeschluss.wupportal.activity;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.provider.ProviderEntity;

@Service
public class ActivityService extends DataService<ActivityEntity> {

	public ActivityService(ActivityRepository repo) {
		super(repo);
		// TODO Auto-generated constructor stub
	}

	public List<ActivityEntity> getActivitiesByProviderId(Sort sort, String... providerId) {
		return getRepo().findByProviderIdIn(Arrays.asList(providerId), sort).orElseThrow(() -> new NotFoundException(providerId.toString()));
	}
	
	public Page<ActivityEntity> getPagedActivitiesByProviderId(PageRequest page, String... providerId) {
		return getRepo().findByProviderIdIn(Arrays.asList(providerId), page).orElseThrow(() -> new NotFoundException(providerId.toString()));
	}
	
	public List<ActivityEntity> getActivitiesByProviders(Sort sort, List<ProviderEntity> providers) {
		return getRepo().findByProviderIn(providers, sort).orElseThrow(() -> new NotFoundException(providers.toString()));
	}
	
	public Page<ActivityEntity> getPagedActivitiesByProviders(PageRequest page, List<ProviderEntity> providers) {
		return getRepo().findByProviderIn(providers, page).orElseThrow(() -> new NotFoundException(providers.toString()));
	}

	public boolean isActivityForProvider(String activityId, List<ProviderEntity> providers) {
		return getRepo().existsByIdAndProviderIn(activityId, providers);
	}
	
	public ActivityRepository getRepo() {
		if (repo instanceof ActivityRepository) {
			return (ActivityRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + ActivityRepository.class.getName());
		}
	}

}
