package de.codeschluss.wupportal.provider;

import java.net.URISyntaxException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.core.DummyInvocationUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import de.codeschluss.wupportal.activity.ActivityEntity;
import de.codeschluss.wupportal.activity.ActivityService;
import de.codeschluss.wupportal.base.CrudController;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

public class ProviderController extends CrudController<ProviderEntity, ProviderResourceAssembler, ProviderService>{

	private final ActivityService activityService;
	
	public ProviderController(
			ProviderService service, 
			ProviderResourceAssembler assembler,
			ActivityService activityService
			) {
		super(service, assembler);
		this.activityService = activityService;
	}
	
	@GetMapping("/providers")
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@GetMapping("/providers/{id}")
	public Resource<ProviderEntity> findOne(@PathVariable String id) {
		return super.findOne(id);
	}
	
	@PostMapping("/providers")
	public ResponseEntity<?> add(@RequestBody ProviderEntity newProvider) throws URISyntaxException {
		return super.add(newProvider);
	}
	
	@PutMapping("/providers/{id}")
	public ResponseEntity<?> update(@RequestBody ProviderEntity newProvider, @PathVariable String id) throws URISyntaxException {
		return super.update(newProvider, id);
	}
	
	@DeleteMapping("/providers/{id}")
	public ResponseEntity<?> delete(@PathVariable String id) {
		return super.delete(id);
	}
	
	@GetMapping("/providers/{id}/activities")
	public ResponseEntity<?> findActivitiesByProvider(@PathVariable String id, FilterSortPaginate params) {
		ResponseEntity<String> badRequest = validateRequest(params, ActivityEntity.class);
		if (badRequest != null) return badRequest;
		
		Sort sort = params.createSort("id");
		if (params.getPage() == null && params.getSize() == null) {
			return ResponseEntity.ok(
					assembler.toListSubResource(
							activityService.getActivitiesByProviderId(sort, id),
							DummyInvocationUtils.methodOn(this.getClass()).findActivitiesByProvider(id, params)));
		}
		
		PageRequest pageRequest = PageRequest.of(params.getPage(), params.getSize(), sort);
		return ResponseEntity.ok(
				assembler.toPagedSubResource(params,
						activityService.getPagedActivitiesByProviderId(pageRequest, id)));
	}

}
