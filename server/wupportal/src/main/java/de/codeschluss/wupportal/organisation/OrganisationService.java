package de.codeschluss.wupportal.organisation;

import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.organisation.OrganisationEntity;

@Service
public class OrganisationService extends DataService<OrganisationEntity> {
	
	public OrganisationService(
			OrganisationRepository orgaRepo) {
		super(orgaRepo);
	}
	

	public OrganisationRepository getRepo() {
		if (repo instanceof OrganisationRepository) {
			return (OrganisationRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + OrganisationRepository.class.getName());
		}
	}
}
