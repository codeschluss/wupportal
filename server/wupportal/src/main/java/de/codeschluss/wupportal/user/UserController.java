package de.codeschluss.wupportal.user;

import java.net.URISyntaxException;
import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import de.codeschluss.wupportal.base.CrudController;
import de.codeschluss.wupportal.base.PagingAndSortingAssembler;
import de.codeschluss.wupportal.exception.BadParamsException;
import de.codeschluss.wupportal.exception.DuplicateEntryException;
import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.provider.ProviderEntity;
import de.codeschluss.wupportal.provider.ProviderService;
import de.codeschluss.wupportal.provider.ProviderTO;
import de.codeschluss.wupportal.security.permissions.OwnOrSuperUserPermission;
import de.codeschluss.wupportal.security.permissions.OwnUserPermission;
import de.codeschluss.wupportal.security.permissions.SuperUserPermission;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

@RestController
public class UserController extends CrudController<UserEntity, PagingAndSortingAssembler<UserEntity>, UserService>{

	private final ProviderService providerService;
	
	protected final String DEFAULT_SORT_PROP = "username";

	public UserController(UserService userService,
			ProviderService providerService,
			UserResourceAssembler userAssembler) {
		super(userService, userAssembler);
		this.providerService = providerService;
	}
	
	@GetMapping("/users")
	@SuperUserPermission
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@GetMapping("/users/{id}")
	@OwnOrSuperUserPermission
	public Resource<UserEntity> findOne(@PathVariable String id) {
		return super.findOne(id);
	}
	
	@PostMapping("/users")
	public ResponseEntity<?> add(@RequestBody UserEntity newUser) throws URISyntaxException {
		if (service.userExists(newUser.getUsername())) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Username already exists!");
		}
		return super.add(newUser);
	}
	
	@PutMapping("/users/{id}")
	@OwnUserPermission
	public ResponseEntity<?> update(@RequestBody UserEntity newUser, @PathVariable String id) throws URISyntaxException {
		return super.update(newUser, id);
	}
	
	@DeleteMapping("/users/{id}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String id) {
		return super.delete(id);
	}
	
	@PutMapping("/users/{id}/superuser")
	@SuperUserPermission
	public ResponseEntity<?> grantSuperuser(@PathVariable String id, @RequestBody boolean isSuperuser) {
		try {
			this.service.grantSuperUser(id, isSuperuser);
			return ResponseEntity.noContent().build();
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User with given ID does not exist!");
		}
	}
	
	@PostMapping("/users/{id}/providers")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> addProvidersforUser(@PathVariable String id, ProviderTO... providerTOs) {
		try {
			List<ProviderEntity> providers = providerService.mapForUser(providerTOs, service.getById(id));
			
			return ResponseEntity.ok(
					assembler.toListSubResource(
						providerService.addAll(providers),
						DummyInvocationUtils.methodOn(this.getClass()).findProvidersByUser(id, null)));
		} catch (NotFoundException | NullPointerException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User or Organisation are null or do not exist!");
		}
	}
	
	@GetMapping("/users/{id}/providers")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> findProvidersByUser(@PathVariable String id, FilterSortPaginate params) {
		validateRequest(params);
		
		Sort sort = params.createSort("id");
		if (params.getPage() == null && params.getSize() == null) {
			return ResponseEntity.ok(
					assembler.toListSubResource(
							providerService.getProvidersByUser(service.getById(id), sort),
							DummyInvocationUtils.methodOn(this.getClass()).findProvidersByUser(id, params)));
		}
		
		PageRequest pageRequest = PageRequest.of(params.getPage(), params.getSize(), sort);
		return ResponseEntity.ok(
				assembler.toPagedSubResource(params,
						providerService.getPagedProvidersByUser(service.getById(id), pageRequest)));
	}
	
	@DeleteMapping("/users/{id}/providers/{providerId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> deleteProviderforUser(@PathVariable String id, @PathVariable String providerId) {
		providerService.delete(providerId);
		return ResponseEntity.noContent().build();
	}
}
