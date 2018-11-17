package de.codeschluss.portal.functional.translation;

import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

@Service
public class TranslationResourceAssembler extends PagingAndSortingAssembler<TranslationEntity> {

	@Override
	protected List<Link> createResourceLinks(TranslationEntity entity) {
		// TODO Auto-generated method stub
		return null;
	}

}
