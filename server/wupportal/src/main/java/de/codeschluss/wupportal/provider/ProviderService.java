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
public class ProviderService implements DataService<ProviderEntity> {
	
	private final ProviderRepository repo;
	
	public ProviderService(ProviderRepository providerRepo) {
		this.repo = providerRepo;
	}

	@Override
	public List<ProviderEntity> getSorted(String filter, Sort sort) {
		return filter == null
				? repo.findAll()
				: repo.findFiltered(filter, sort).orElseThrow(() -> new NotFoundException(filter));
	}

	@Override
	public Page<ProviderEntity> getPaged(String filter, PageRequest page) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProviderEntity getById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProviderEntity add(ProviderEntity newEntity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProviderEntity update(String id, ProviderEntity updatedEntity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		
	}
	
	public List<ProviderEntity> getProvidersByUser(UserEntity user) {
		return repo.findByUser(user).orElseThrow(() -> new NotFoundException(user.getId()));
	}

}
