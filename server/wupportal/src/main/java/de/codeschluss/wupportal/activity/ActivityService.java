package de.codeschluss.wupportal.activity;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;

public class ActivityService extends DataService<ActivityEntity> {

	public ActivityService(ActivityRepository repo) {
		super(repo);
		// TODO Auto-generated constructor stub
	}

	public List<ActivityEntity> getActivitiesByProviderId(Sort sort, String... providerId) {
		return ((ActivityRepository) repo).findByProviderIdIn(Arrays.asList(providerId), sort).orElseThrow(() -> new NotFoundException(providerId.toString()));
	}
	
	public Page<ActivityEntity> getPagedActivitiesByProviderId(PageRequest page, String... providerId) {
		return ((ActivityRepository) repo).findByProviderIdIn(Arrays.asList(providerId), page).orElseThrow(() -> new NotFoundException(providerId.toString()));
	}

}
