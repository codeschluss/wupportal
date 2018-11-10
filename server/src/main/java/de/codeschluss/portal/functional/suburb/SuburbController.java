package de.codeschluss.portal.functional.suburb;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import de.codeschluss.portal.common.base.CrudController;
import de.codeschluss.portal.common.security.permissions.SuperUserPermission;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
@RestController
public class SuburbController extends CrudController<SuburbEntity, SuburbService> {

	public SuburbController(SuburbService service) {
		super(service);
	}
	
	@Override
	@GetMapping("/suburbs")
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@Override
	@GetMapping("/suburbs/{surburbId}")
	public Resource<SuburbEntity> findOne(@PathVariable String surburbId) {
		return super.findOne(surburbId);
	}
	
	@Override
	@PostMapping("/suburbs")
	@SuperUserPermission
	public ResponseEntity<?> add(@RequestBody SuburbEntity newSuburb) throws URISyntaxException {
		return super.add(newSuburb);
	}
	
	@Override
	@PutMapping("/suburbs/{surburbId}")
	@SuperUserPermission
	public ResponseEntity<?> update(@RequestBody SuburbEntity newSuburb, @PathVariable String surburbId) throws URISyntaxException {
		return super.update(newSuburb, surburbId);
	}
	
	@Override
	@DeleteMapping("/suburbs/{surburbId}")
	@SuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String surburbId) {
		return super.delete(surburbId);
	}
}
