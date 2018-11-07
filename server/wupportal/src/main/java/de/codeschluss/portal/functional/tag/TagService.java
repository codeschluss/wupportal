package de.codeschluss.portal.functional.tag;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class TagService extends DataService<TagEntity, TagRepository> {

	public TagService(TagRepository repo, 
			TagResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public TagEntity getDuplicate(TagEntity newEntity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TagEntity update(String id, TagEntity updatedEntity) {
		// TODO Auto-generated method stub
		return null;
	}

}
