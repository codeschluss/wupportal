package de.codeschluss.portal.functional.translation;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class TranslationService extends DataService<TranslationEntity> {

	public TranslationService(TranslationRepository repo,
			TranslationResourceAssembler assembler) {
		super(repo, assembler);
		// TODO Auto-generated constructor stub
	}

}
