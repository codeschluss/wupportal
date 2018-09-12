package de.codeschluss.wupportal.provider;

import java.util.List;

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
	
	public List<ProviderEntity> getProvidersByUser(UserEntity user) {
		return ((ProviderRepository) repo).findByUser(user).orElseThrow(() -> new NotFoundException(user.getId()));
	}

}
