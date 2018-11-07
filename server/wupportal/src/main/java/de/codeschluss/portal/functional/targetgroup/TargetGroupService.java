package de.codeschluss.portal.functional.targetgroup;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class TargetGroupService extends DataService<TargetGroupEntity, TargetGroupRepository> {

	public TargetGroupService(TargetGroupRepository repo,
			TargetGroupResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public TargetGroupEntity getDuplicate(TargetGroupEntity newEntity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TargetGroupEntity update(String id, TargetGroupEntity updatedEntity) {
		// TODO Auto-generated method stub
		return null;
	}

}
