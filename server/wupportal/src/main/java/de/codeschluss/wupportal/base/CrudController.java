package de.codeschluss.wupportal.base;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.core.DummyInvocationUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import de.codeschluss.wupportal.exception.BadParamsException;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

public abstract class CrudController<E extends BaseEntity, A extends PagingAndSortingAssembler<E>, S extends DataService<E>> {
	
	protected final S service;
	protected final A assembler;
	
	protected final String DEFAULT_SORT_PROP = "id";
	
	public CrudController(S service, A assembler) {
		this.assembler = assembler;
		this.service = service;
	}

	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		validateRequest(params);
		
		Sort sort = params.createSort(DEFAULT_SORT_PROP);
		if (params.getPage() == null && params.getSize() == null) {
			return ResponseEntity.ok(
					assembler.toListResource(
							service.getSorted(params.getFilter(), sort),
							getFindAllMethodOn()));
		}
		
		PageRequest pageRequest = PageRequest.of(params.getPage(), params.getSize(), sort);
		return ResponseEntity.ok(
				assembler.toPageResource(params,
						service.getPaged(params.getFilter(), pageRequest)));
	}

	public Resource<E> findOne(@PathVariable String id) {
		return assembler.toResource(service.getById(id));
	}
	
	public ResponseEntity<?> add(@RequestBody E newEntity) throws URISyntaxException {
		Resource<E> resource = assembler.toResource(service.add(newEntity));
		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}
	
	public ResponseEntity<?> update(@RequestBody E newEntity, @PathVariable String id) throws URISyntaxException {
		Resource<E> resource = assembler.toResource(service.update(id, newEntity));
		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}
	
	public ResponseEntity<?> delete(@PathVariable String id) {
		service.delete(id);
		return respondNoContent();
	}
	
	protected void validateRequest(FilterSortPaginate params) {
		if (params != null && !isPaginationValid(params.getPage(), params.getSize())) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("param size or page is null");
		}
	}
	
	private boolean isPaginationValid(Integer page, Integer size) {
		return (page != null && size != null) || (page == null && size == null);
	}
	

	private ResponseEntity<?> getFindAllMethodOn() {
		return DummyInvocationUtils.methodOn(this.getClass()).findAll(null);
	}

	public ResponseEntity<?> respondNoContent() {
		return ResponseEntity.noContent().build();
	}
}
