package de.codeschluss.wupportal.users;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.model.Provider;
import de.codeschluss.wupportal.repository.ProviderRepository;

@RestController
public class UserController {

	private final UserService userService;
	private final ProviderRepository providerRepo;
	private final UserResourceAssembler assembler;

	public UserController(UserService userService,
			ProviderRepository providerRepo,
			UserResourceAssembler userAssembler) {
		this.providerRepo = providerRepo;
		this.assembler = userAssembler;
		this.userService = userService;
	}

	@GetMapping("/users")
	public ResponseEntity<?> findAll(@RequestParam(required = false) String filter,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "size", required = false) Integer size,
			@RequestParam(value = "order", defaultValue = "ASC", required = false) Sort.Direction direction,
			@RequestParam(value = "sort", defaultValue = "username", required = false) String... sortPropterties) {
		
		if ((page == null && size != null) || (page != null && size == null)) {
			//TODO: Error Objects with proper message
			return ResponseEntity.badRequest().body("test");
		}
		
		Sort sort = new Sort(direction, sortPropterties);
		if (page == null && size == null) {
			return ResponseEntity.ok(
					assembler.toResource(
							userService.getSortedUsers(filter, sort)));
		}
		
		PageRequest pageRequest = PageRequest.of(page, size, sort);
		return ResponseEntity.ok(
				assembler.toResource(
						userService.getPagedUsers(filter, pageRequest)));
	}

	@GetMapping("/users/{id}")
	public Resource<UserEntity> findOne(@PathVariable String id) {
		return assembler.toResource(userService.getById(id));
	}

	@GetMapping("/users/{id}/providers")
	public Resources<Provider> findProvidersByUser(@PathVariable String id) {
		UserEntity user = userService.getById(id);
		return assembler.toProviderResources(id,
				providerRepo.findByUser(user).orElseThrow(() -> new NotFoundException(id)));
	}

	@PostMapping("/users")
	public ResponseEntity<?> addUser(@RequestBody UserEntity newUser) throws URISyntaxException {
		Resource<UserEntity> resource = assembler.toResource(userService.add(newUser));
		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<?> updateUser(@RequestBody UserEntity newUser, @PathVariable String id) throws URISyntaxException {
		Resource<UserEntity> resource = assembler.toResource(userService.updateUser(id, newUser));
		return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);

	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable String id) {
		userService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
