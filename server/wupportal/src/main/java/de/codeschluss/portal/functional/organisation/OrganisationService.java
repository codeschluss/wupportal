package de.codeschluss.portal.functional.organisation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.base.ResourceWithEmbeddable;
import de.codeschluss.portal.functional.address.AddressEntity;
import de.codeschluss.portal.functional.address.AddressService;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;

@Service
public class OrganisationService extends DataService<OrganisationEntity, OrganisationRepository> {
	
	public OrganisationService(
			OrganisationRepository repo,
			OrganisationResourceAssembler assembler,
			AddressService addressService) {
		super(repo, assembler);
	}
	
	public boolean existsByName(String name) {
		return repo.existsByName(name);
	}
	
	public boolean existsById(String organisationId) {
		return repo.existsById(organisationId);
	}
	
	public OrganisationEntity getDuplicate(OrganisationEntity orga) {
		return repo.findByName(orga.getName()).orElse(null);
	}

	public OrganisationEntity update(String id, OrganisationEntity newOrga) {
		return repo.findById(id).map(orga -> {
			orga.setDescription(newOrga.getDescription());
			orga.setImage(newOrga.getImage());
			orga.setMail(newOrga.getMail());
			orga.setName(newOrga.getName());
			orga.setPhone(newOrga.getPhone());
			orga.setWebsite(newOrga.getWebsite());
			return repo.save(orga);
		}).orElseGet(() -> {
			newOrga.setId(id);
			return repo.save(newOrga);
		});
	}
	
	public OrganisationEntity updateAddress(String organisationId, AddressEntity address) {
		OrganisationEntity orga = getById(organisationId);
		orga.setAddress(address);
		return repo.save(orga);
	}
	
	public Resources<?> convertToResourcesWithProviders(List<ProviderEntity> providers, ResponseEntity<?> responseEntity) {
		List<ResourceWithEmbeddable<OrganisationEntity>> result = providers.stream().map(provider -> {
			return assembler.toResourceWithEmbedabble(provider.getOrganisation(), provider, "provider");
		}).collect(Collectors.toList());
		
		return assembler.toListResources(result, responseEntity);
	}
}
