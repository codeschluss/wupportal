package de.codeschluss.portal.functional.tag;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class TagService extends DataService<TagEntity> {

	public TagService(TagRepository repo, TagResourceAssembler assembler) {
		super(repo, assembler);
	}

}
