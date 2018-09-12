package de.codeschluss.wupportal.base;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import de.codeschluss.wupportal.exception.NotFoundException;

public abstract class DataService<E extends BaseEntity> {
	
	protected final FilteredJpaRepository<E, String> repo;
	
	public DataService(FilteredJpaRepository<E, String> repo) {
		this.repo = repo;
	}
	
	public List<E> getSorted(String filter, Sort sort) {
		return filter == null
				? repo.findAll()
				: repo.findFiltered(filter, sort).orElseThrow(() -> new NotFoundException(filter));
	}
	
	public Page<E> getPaged(String filter, PageRequest page) {
		return filter == null 
				? repo.findAll(page)
				: repo.findFiltered(filter, page).orElseThrow(() -> new NotFoundException(filter));
	}
	
	public E getById(String id) {
		return repo.findById(id).orElseThrow(() -> new NotFoundException(id));
	}
	
	public E add(E newEntity) {
		return repo.save(newEntity);
	}
	
	public E update(String id, E updatedEntity) {
		return repo.findById(id).map(entity -> {
			//TODO: save all fields except id
			entity = updatedEntity;
			return repo.save(entity);
		}).orElseGet(() -> {
			updatedEntity.setId(id);
			return add(updatedEntity);
		});
	}
	
	public void delete(String id) {
		repo.deleteById(id);
	}

}
