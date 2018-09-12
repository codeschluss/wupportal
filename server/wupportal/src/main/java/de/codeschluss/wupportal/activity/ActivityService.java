package de.codeschluss.wupportal.activity;

import java.util.Arrays;
import java.util.List;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;

public class ActivityService extends DataService<ActivityEntity> {

	public ActivityService(ActivityRepository repo) {
		super(repo);
		// TODO Auto-generated constructor stub
	}

	public List<ActivityEntity> getActivitiesByProviderId(String... providerId) {
		// TODO Auto-generated method stub
		return ((ActivityRepository) repo).findByProviderIdIn(Arrays.asList(providerId)).orElseThrow(() -> new NotFoundException(providerId.toString()));
	}

}
