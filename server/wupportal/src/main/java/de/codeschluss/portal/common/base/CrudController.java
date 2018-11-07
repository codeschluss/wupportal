package de.codeschluss.portal.common.base;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.data.domain.Example;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.core.DummyInvocationUtils;
import org.springframework.http.ResponseEntity;

import static org.springframework.http.ResponseEntity.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.common.exception.DuplicateEntryException;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.common.utils.SortPaginate;

public abstract class CrudController<E extends BaseEntity, S extends DataService<E, ?>> {
	
	protected final S service;
	
	public CrudController(S service) {
		this.service = service;
	}

	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		validateRequest(params);
	
		if (params.getPage() == null && params.getSize() == null) {
			return ok(
					service.getSortedListResources(
							params, 
							DummyInvocationUtils.methodOn(this.getClass()).findAll(null)));
		}
		return ok(service.getPagedResources(params));
	}

	public Resource<E> findOne(@PathVariable String id) {
		return service.getResourceById(id);
	}
	
	public ResponseEntity<?> add(@RequestBody E newEntity) throws URISyntaxException {
		checkForDuplicates(newEntity);
		
		Resource<E> resource = service.addResource(newEntity);
		return created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	public ResponseEntity<?> update(@RequestBody E newEntity, @PathVariable String id) throws URISyntaxException {
		checkForDuplicates(newEntity);
		
		Resource<E> resource = service.updateResource(id, newEntity);
		return created(new URI(resource.getId().expand().getHref())).body(resource);
	}
	
	public ResponseEntity<?> delete(@PathVariable String id) {
		service.delete(id);
		return noContent().build();
	}
	
	protected void checkForDuplicates(E newEntity) {
		if (service.exists(Example.of(newEntity))) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Entity already exists!");
		}
	}
	
	protected void validateRequest(SortPaginate params) {
		if (params != null && !isPaginationValid(params.getPage(), params.getSize())) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("param size or page is null");
		}
	}
	
	protected boolean isPaginationValid(Integer page, Integer size) {
		return (page != null && size != null) || (page == null && size == null);
	}
}
