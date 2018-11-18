package de.codeschluss.portal.functional.translation;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

@Service
public class TranslationResourceAssembler extends PagingAndSortingAssembler<TranslationEntity> {

  @Override
  protected List<Link> createResourceLinks(TranslationEntity entity) {
    // TODO Auto-generated method stub
    return null;
  }

}
