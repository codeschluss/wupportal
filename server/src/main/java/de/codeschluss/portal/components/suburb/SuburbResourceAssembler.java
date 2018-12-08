package de.codeschluss.portal.components.suburb;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.components.address.AddressController;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class SuburbResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class SuburbResourceAssembler extends PagingAndSortingAssembler<SuburbEntity> {

  @Override
  protected List<Link> createResourceLinks(SuburbEntity suburb) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(AddressController.class)
        .readOne(suburb.getId())).withSelfRel());

    return links;
  }
}
