package de.codeschluss.portal.functional.targetgroup;

import java.util.List;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;

@Service
public class TargetGroupService extends DataService<TargetGroupEntity, TargetGroupRepository> {

	protected final String DEFAULT_SORT_PROP = "name";
	
	public TargetGroupService(TargetGroupRepository repo,
			TargetGroupResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public TargetGroupEntity getExisting(TargetGroupEntity newTargetGroup) {
		return repo.findByName(newTargetGroup.getName()).orElse(null);
	}
	

	public Object getResourceByActivity(String activityId) {
		List<TargetGroupEntity> targetGroups = repo.findByActivitiesId(activityId).orElseThrow(() -> new NotFoundException(activityId));
		return assembler.entitiesToResources(targetGroups, null);
	}

	@Override
	public TargetGroupEntity update(String id, TargetGroupEntity newTargetGroup) {
		return repo.findById(id).map(tag -> {
			tag.setName(newTargetGroup.getName());
			tag.setDescription(newTargetGroup.getDescription());
			return repo.save(tag);
		}).orElseGet(() -> {
			newTargetGroup.setId(id);
			return repo.save(newTargetGroup);
		});
	}
}
