package de.codeschluss.portal.functional.activity;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.provider.ProviderEntity;

@Service
public class ActivityService extends DataService<ActivityEntity> {

	public ActivityService(
			ActivityRepository repo,
			ActivityResourceAssembler assembler) {
		super(repo, assembler);
		// TODO Auto-generated constructor stub
	}
	
	public Resources<?> getResourcesByProviders(List<ProviderEntity> providers, ResponseEntity<?> responseEntity) {
		List<ActivityEntity> result = getRepo().findByProviderIn(providers).orElseThrow(() -> new NotFoundException(providers.toString()));
		return assembler.entitiesToResources(result, responseEntity);
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
