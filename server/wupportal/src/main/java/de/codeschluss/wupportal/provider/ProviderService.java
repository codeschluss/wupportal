package de.codeschluss.wupportal.provider;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.DataService;
import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.user.UserEntity;

@Service
public class ProviderService extends DataService<ProviderEntity> {
	
	public ProviderService(ProviderRepository providerRepo) {
		super(providerRepo);
	}
	
	public ProviderEntity update(String id, ProviderEntity newProvider) {
		return repo.findById(id).map(provider -> {
			provider.setUser(newProvider.getUser());
			provider.setOrganisation(newProvider.getOrganisation());
			provider.setAdmin(newProvider.isAdmin());
			provider.setApproved(newProvider.isApproved());
			return repo.save(provider);
		}).orElseGet(() -> {
			newProvider.setId(id);
			return add(newProvider);
		});
	}
	
	public Page<ProviderEntity> getPagedProvidersByUser(UserEntity user, PageRequest page) {
		return ((ProviderRepository) repo).findByUser(user, page).orElseThrow(() -> new NotFoundException(user.getId()));
	}
	
	public List<ProviderEntity> getProvidersByUser(UserEntity user, Sort sort) {
		return ((ProviderRepository) repo).findByUser(user, sort).orElseThrow(() -> new NotFoundException(user.getId()));
	}
}
