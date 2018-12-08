package de.codeschluss.portal.components.organisation;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class OrganisationResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class OrganisationResourceAssembler extends PagingAndSortingAssembler<OrganisationEntity> {

  @Override
  protected List<Link> createResourceLinks(OrganisationEntity organisation) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(OrganisationController.class)
        .readOne(organisation.getId())).withSelfRel());
    links.add(linkTo(methodOn(OrganisationController.class)
        .readActivities(organisation.getId())).withRel("activities"));
    links.add(linkTo(methodOn(OrganisationController.class)
        .readUsers(organisation.getId())).withRel("users"));
    links.add(linkTo(methodOn(OrganisationController.class)
        .readAddress(organisation.getId())).withRel("address"));
    links.add(linkTo(methodOn(OrganisationController.class)
        .readTranslations(organisation.getId())).withRel("translations"));

    return links;
  }

}
