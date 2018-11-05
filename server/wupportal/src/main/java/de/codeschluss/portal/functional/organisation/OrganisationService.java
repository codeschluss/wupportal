package de.codeschluss.portal.functional.organisation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.base.ResourceWithEmbeddable;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;

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
	
	public OrganisationEntity update(String id, OrganisationEntity newOrga) {
		return getRepo().findById(id).map(orga -> {
			orga.setDescription(newOrga.getDescription());
			orga.setImage(newOrga.getImage());
			orga.setMail(newOrga.getMail());
			orga.setName(newOrga.getName());
			orga.setPhone(newOrga.getPhone());
			orga.setWebsite(newOrga.getWebsite());
			return getRepo().save(orga);
		}).orElseGet(() -> {
			newOrga.setId(id);
			return getRepo().save(newOrga);
		});
	}
	
	public Resources<?> convertToResourcesWithProviders(List<ProviderEntity> providers, ResponseEntity<?> responseEntity) {
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
