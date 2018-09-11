package de.codeschluss.wupportal.base;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import de.codeschluss.wupportal.user.UserEntity;

public abstract class CrudController<E extends BaseEntity, A extends PagingAndSortingAssembler<E>, S extends DataService<E>> {
	
	protected final S service;
	protected final A assembler;

	protected final String DEFAULT_SORT_PROPERTY;
	
	public CrudController(S service, A assembler, String defaultSortProp) {
		this.assembler = assembler;
		this.service = service;
		this.DEFAULT_SORT_PROPERTY = defaultSortProp;
	}

	public ResponseEntity<?> findAll(@RequestParam(required = false) String filter,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "size", required = false) Integer size,
			@RequestParam(value = "order", defaultValue = "ASC", required = false) Sort.Direction direction,
			@RequestParam(value = "sort", defaultValue ="default", required = false) String... sortProperties) {
		
		if (!isPaginationValid(page, size)) {
			//TODO: Error Objects with proper message
			return ResponseEntity.badRequest().body("either bith size and page are null or both contain values");
		}
		
		if (!isSortingValid(sortProperties)) {
			//TODO: Error Objects with proper message
			return ResponseEntity.badRequest().body("sort property does not exist");
		}
		
		Sort sort = new Sort(direction, sortProperties);
		if (page == null && size == null) {
			return ResponseEntity.ok(
					assembler.toResource(
							service.getSorted(filter, sort)));
		}
		
		PageRequest pageRequest = PageRequest.of(page, size, sort);
		return ResponseEntity.ok(
				assembler.toResource(
						service.getPaged(filter, pageRequest)));
	}

	private boolean isPaginationValid(Integer page, Integer size) {
		return (page != null && size != null) || (page == null && size == null);
	}
	
	
	private boolean isSortingValid(String[] sortProperties) {
		return Arrays
				.stream(UserEntity.class.getDeclaredFields())
				.anyMatch(f -> Arrays.asList(sortProperties).contains(f.getName()));
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
		return ResponseEntity.noContent().build();
	}
}
