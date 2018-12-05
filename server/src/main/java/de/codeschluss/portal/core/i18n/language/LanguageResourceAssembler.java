package de.codeschluss.portal.core.i18n.language;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class LanguageResourceAssembler.
 * 
 * @author Valmir Etemi
 * 
 */
@Service
public class LanguageResourceAssembler extends PagingAndSortingAssembler<LanguageEntity> {

  @Override
  protected List<Link> createResourceLinks(LanguageEntity language) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(LanguageController.class)
        .findOne(language.getId())).withSelfRel());

    return links;
  }
}
