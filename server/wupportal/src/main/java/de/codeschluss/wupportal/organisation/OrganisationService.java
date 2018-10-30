package de.codeschluss.wupportal.organisation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.organisation.OrganisationEntity;
import de.codeschluss.wupportal.provider.ProviderEntity;

@Service
public class OrganisationService extends DataService<OrganisationEntity> {
	
	public OrganisationService(
			OrganisationRepository orgaRepo) {
		super(orgaRepo);
	}
	
	public boolean organisationExists(String name) {
		return getRepo().existsByName(name);
	}
	
	public List<OrganisationUserTO> getOrganisationsByProviders(List<ProviderEntity> providers, Sort sort) {
		List<OrganisationEntity> orgas =  getRepo().findByProvidersIn(providers, sort).orElseThrow(() -> new NotFoundException(""));
		return mapOrgasTO(orgas, providers);
	}
	
	public List<OrganisationUserTO> getOrganisationsByProviders(List<ProviderEntity> providers) {
		List<OrganisationEntity> orgas =  getRepo().findByProvidersIn(providers).orElseThrow(() -> new NotFoundException(""));
		return mapOrgasTO(orgas, providers);
	}
	
	public Page<OrganisationUserTO> getPagedOrganisationsByProviders(List<ProviderEntity> providers, PageRequest pageRequest) {
		Page<OrganisationEntity> orgas =  getRepo().findByProvidersIn(providers, pageRequest).orElseThrow(() -> new NotFoundException(""));
		return orgas.map(orga -> {
			return new OrganisationUserTO(orga, getProvider(providers, orga.getId()));
		});
	}
	
	private List<OrganisationUserTO> mapOrgasTO(List<OrganisationEntity> orgas, List<ProviderEntity> providers) {
		return orgas.stream().map(orga -> {
			return new OrganisationUserTO(orga, getProvider(providers, orga.getId()));
		}).collect(Collectors.toList());
	}

	private ProviderEntity getProvider(List<ProviderEntity> providers, String orgaId) {
		return providers.stream().filter(p -> p.getOrganisation().getId().equals(orgaId)).findFirst().orElseThrow(() -> new NotFoundException(""));
	}

	public OrganisationRepository getRepo() {
		if (repo instanceof OrganisationRepository) {
			return (OrganisationRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + OrganisationRepository.class.getName());
		}
	}
}
