package de.codeschluss.portal.components.user;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class UserResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class UserResourceAssembler extends PagingAndSortingAssembler<UserEntity> {

  @Override
  protected List<Link> createResourceLinks(UserEntity user) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(UserController.class)
        .findOne(user.getId())).withSelfRel());
    links.add(linkTo(methodOn(UserController.class)
        .findOrganisations(user.getId())).withRel("organisations"));
    links.add(linkTo(methodOn(UserController.class)
        .findActivities(user.getId())).withRel("activities"));

    return links;
  }

}
