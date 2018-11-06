package de.codeschluss.portal.functional.suburb;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class SuburbService extends DataService<SuburbEntity> {

	public SuburbService(SuburbRepository repo,
			SuburbResourceAssembler assembler) {
		super(repo, assembler);
	}

}
