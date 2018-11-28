package de.codeschluss.portal.components.address;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class AdressResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class AddressResourceAssembler extends PagingAndSortingAssembler<AddressEntity> {

  @Override
  protected List<Link> createResourceLinks(AddressEntity address) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(AddressController.class)
        .findOne(address.getId())).withSelfRel());
    links.add(linkTo(methodOn(AddressController.class)
        .findSuburb(address.getId())).withRel("suburb"));

    return links;
  }
}
