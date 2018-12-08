package de.codeschluss.portal.components.activity;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
* The Class ActivityResourceAssembler.
* 
* @author Valmir Etemi
*
*/
@Service
public class ActivityResourceAssembler extends PagingAndSortingAssembler<ActivityEntity> {

  @Override
  protected List<Link> createResourceLinks(ActivityEntity activity) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(ActivityController.class)
        .readOne(activity.getId())).withSelfRel());
    links.add(linkTo(methodOn(ActivityController.class)
        .readOrganisation(activity.getId())).withRel("organisation"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readUser(activity.getId())).withRel("user"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readCategory(activity.getId())).withRel("category"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readSchedules(activity.getId(), null)).withRel("schedules"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readTags(activity.getId())).withRel("tags"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readTargetGroups(activity.getId())).withRel("targetgroups"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readAddress(activity.getId())).withRel("address"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readTranslations(activity.getId())).withRel("translations"));

    return links;
  }

}
