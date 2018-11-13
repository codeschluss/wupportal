package de.codeschluss.portal.functional.tag;

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
import de.codeschluss.portal.functional.tag.TagEntity;

@RestController
public class TagController extends CrudController<TagEntity, TagService> {

	public TagController(TagService service) {
		super(service);
	}
	
	@Override
	@GetMapping("/tags")
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@Override
	@GetMapping("/tags/{tagId}")
	public Resource<TagEntity> findOne(@PathVariable String tagId) {
		return super.findOne(tagId);
	}
	
	@Override
	@PostMapping("/tags")
	@SuperUserPermission
	public ResponseEntity<?> add(@RequestBody TagEntity newTag) throws URISyntaxException {
		return super.add(newTag);
	}
	
	@Override
	@PutMapping("/tags/{tagId}")
	@SuperUserPermission
	public ResponseEntity<?> update(@RequestBody TagEntity newTag, @PathVariable String tagId) throws URISyntaxException {
		return super.update(newTag, tagId);
	}
	
	@Override
	@DeleteMapping("/tags/{tagId}")
	@SuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String tagId) {
		return super.delete(tagId);
	}

}
