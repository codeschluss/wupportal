package de.codeschluss.portal.functional.targetgroup;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import de.codeschluss.portal.common.base.CrudController;
import de.codeschluss.portal.common.security.permissions.SuperUserPermission;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.targetgroup.TargetGroupEntity;

public class TargetGroupController extends CrudController<TargetGroupEntity, TargetGroupService>{

	public TargetGroupController(TargetGroupService service) {
		super(service);
		// TODO Auto-generated constructor stub
	}
	
	@Override
	@GetMapping("/targetgroups")
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@Override
	@GetMapping("/targetgroups/{targetGroupId}")
	public Resource<TargetGroupEntity> findOne(@PathVariable String targetGroupId) {
		return super.findOne(targetGroupId);
	}
	
	@Override
	@PostMapping("/targetgroups")
	@SuperUserPermission
	public ResponseEntity<?> add(@RequestBody TargetGroupEntity newTargetGroup) throws URISyntaxException {
		return super.add(newTargetGroup);
	}
	
	@Override
	@PutMapping("/targetgroups/{targetGroupId}")
	@SuperUserPermission
	public ResponseEntity<?> update(@RequestBody TargetGroupEntity newTargetGroup, @PathVariable String targetGroupId) throws URISyntaxException {
		return super.update(newTargetGroup, targetGroupId);
	}
	
	@Override
	@DeleteMapping("/targetgroups/{targetGroupId}")
	@SuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String targetGroupId) {
		return super.delete(targetGroupId);
	}
}
