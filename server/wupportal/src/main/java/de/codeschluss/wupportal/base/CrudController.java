package de.codeschluss.wupportal.base;

import java.lang.reflect.Field;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.core.DummyInvocationUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import de.codeschluss.wupportal.utils.FilterSortPaginate;

public abstract class CrudController<E extends BaseEntity, A extends PagingAndSortingAssembler<E>, S extends DataService<E>> {
	
	protected final S service;
	protected final A assembler;
	protected final Class<E> entityClass;
	
	protected final String DEFAULT_SORT_PROP = "id";
	
	public CrudController(S service, A assembler, Class<E> entityClass) {
		this.assembler = assembler;
		this.service = service;
		this.entityClass = entityClass;
	}

	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		ResponseEntity<String> badRequest = validateRequest(params, null);
		if (badRequest != null) return badRequest;
		
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
		return ResponseEntity.noContent().build();
	}
	
	protected ResponseEntity<String> validateRequest(FilterSortPaginate params, Class<?> entityClass) {
		if (!isPaginationValid(params.getPage(), params.getSize())) {
			//TODO: Error Objects with proper message
			return ResponseEntity.badRequest().body("either both size and page are null or both contain values");
		}
		if (!isSortingValid(params.getSort(), entityClass)) {
			//TODO: Error Objects with proper message
			return ResponseEntity.badRequest().body("sort property does not exist");
		}
		return null;
	}
	
	private boolean isPaginationValid(Integer page, Integer size) {
		return (page != null && size != null) || (page == null && size == null);
	}
	
	private boolean isSortingValid(String sortProp, Class<?> entityClass) {
		Class<?> entityToCheck = getEntityClass(entityClass);
		return sortProp != null && Arrays
				.stream(getAllFields(entityToCheck))
				.anyMatch(f -> f.getName().equals(sortProp));
	}

	private Class<?> getEntityClass(Class<?> entityClass) {
		return entityClass == null
				? this.entityClass
				: entityClass;
	}
	
	private Field[] getAllFields(Class<?> entityToCheck) {
		List<Field> allFields = new ArrayList<Field>();
		
		allFields.addAll(Arrays.asList(entityToCheck.getDeclaredFields()));
		allFields.addAll(Arrays.asList(entityToCheck.getSuperclass().getDeclaredFields()));
		
		return allFields.toArray(new Field[allFields.size()]);
	}

	private ResponseEntity<?> getFindAllMethodOn() {
		return DummyInvocationUtils.methodOn(this.getClass()).findAll(null);
	}
}
