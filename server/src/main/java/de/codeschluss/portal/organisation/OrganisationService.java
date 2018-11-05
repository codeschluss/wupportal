package de.codeschluss.portal.organisation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.base.DataService;
import de.codeschluss.portal.base.ResourceWithEmbeddable;
import de.codeschluss.portal.organisation.OrganisationEntity;
import de.codeschluss.portal.provider.ProviderEntity;

@Service
public class OrganisationService extends DataService<OrganisationEntity> {
	
	public OrganisationService(
			OrganisationRepository repo,
			OrganisationResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	public boolean organisationExists(String name) {
		return getRepo().existsByName(name);
	}
	
	public Resources<?> convertToResourcesWithEmbeddable(List<ProviderEntity> providers, ResponseEntity<?> responseEntity) {
		List<ResourceWithEmbeddable<OrganisationEntity>> result = providers.stream().map(provider -> {
			return assembler.toResourceWithEmbedabble(provider.getOrganisation(), provider, "provider");
		}).collect(Collectors.toList());
		
		return assembler.toListResources(result, responseEntity);
	}
	
	public OrganisationRepository getRepo() {
		if (repo instanceof OrganisationRepository) {
			return (OrganisationRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + OrganisationRepository.class.getName());
		}
	}
}
