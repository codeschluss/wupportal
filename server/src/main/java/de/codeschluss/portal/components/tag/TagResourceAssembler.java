package de.codeschluss.portal.components.tag;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class TagResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class TagResourceAssembler extends PagingAndSortingAssembler<TagEntity> {

  @Override
  protected List<Link> createResourceLinks(TagEntity tag) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(TagController.class).findOne(tag.getId())).withSelfRel());

    return links;
  }
}
