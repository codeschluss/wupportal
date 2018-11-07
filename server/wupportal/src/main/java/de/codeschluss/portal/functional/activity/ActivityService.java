package de.codeschluss.portal.functional.activity;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.provider.ProviderEntity;

@Service
public class ActivityService extends DataService<ActivityEntity, ActivityRepository> {

	public ActivityService(
			ActivityRepository repo,
			ActivityResourceAssembler assembler) {
		super(repo, assembler);
		// TODO Auto-generated constructor stub
	}
	
	public Resources<?> getResourcesByProviders(List<ProviderEntity> providers, ResponseEntity<?> responseEntity) {
		List<ActivityEntity> result = repo.findByProviderIn(providers).orElseThrow(() -> new NotFoundException(providers.toString()));
		return assembler.entitiesToResources(result, responseEntity);
	}

	public boolean isActivityForProvider(String activityId, List<ProviderEntity> providers) {
		return repo.existsByIdAndProviderIn(activityId, providers);
	}

	@Override
	public ActivityEntity getDuplicate(ActivityEntity newEntity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ActivityEntity update(String id, ActivityEntity updatedEntity) {
		// TODO Auto-generated method stub
		return null;
	}
}
