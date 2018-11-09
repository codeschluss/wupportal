package de.codeschluss.portal.common.base;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.common.utils.FilterSortPaginate;

public abstract class DataService<E extends BaseEntity, R extends FilteredJpaRepository<E, String>> {
	
	protected final R repo;
	protected final PagingAndSortingAssembler<E> assembler;
	
	protected final String DEFAULT_SORT_PROP = "id";
	
	public DataService(
			R repo,
			PagingAndSortingAssembler<E> assembler) {
		this.repo = repo;
		this.assembler = assembler;
	}
	
	public boolean exists(Example<E> example) {
		return repo.exists(example);
	}
	
	public boolean existsById(String addressId) {
		return repo.existsById(addressId);
	}
	
	public abstract E getDuplicate(E newEntity);
	
	public Resource<E> getResourceById(String id) {
		return assembler.toResource(getById(id));
	}
	
	public E getById(String id) {
		return repo.findById(id).orElseThrow(() -> new NotFoundException(id));
	}
	
	public List<E> getByIds(List<String> entityIds) {
		return repo.findByIdIn(entityIds).orElseThrow(() -> new NotFoundException(entityIds.toString()));
	}
	
	public Resource<E> addResource(E newEntity) {
		return assembler.toResource(add(newEntity));
	}
	
	public E add(E newEntity) {
		return repo.save(newEntity);
	}
	
	public Resource<E> updateResource(String id, E updatedEntity) {
		return assembler.toResource(update(id, updatedEntity));
	}
	
	public abstract E update(String id, E updatedEntity);
	
	public void delete(String id) {
		repo.deleteById(id);
	}
	
	public Resources<?> getSortedListResources(FilterSortPaginate params, ResponseEntity<?> responseEntity) {
		String filter = params.getFilter();
		List<E> result =  filter == null
				? repo.findAll()
				: repo.findFiltered(filter, getSort(params)).orElseThrow(() -> new NotFoundException(filter));
				
		return assembler.entitiesToResources(result, responseEntity);
	}

	public PagedResources<Resource<E>> getPagedResources(FilterSortPaginate params) {
		String filter = params.getFilter();
		PageRequest page = PageRequest.of(params.getPage(), params.getSize(), getSort(params));
		
		Page<E> result = filter == null 
				? repo.findAll(page)
				: repo.findFiltered(filter, page).orElseThrow(() -> new NotFoundException(filter));
		
		return assembler.entitiesToPagedResources(result, params);
	}
	
	private Sort getSort(FilterSortPaginate params) {
		return params.createSort(DEFAULT_SORT_PROP);
	}

}
