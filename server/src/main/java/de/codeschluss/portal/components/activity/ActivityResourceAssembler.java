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
        .findOrganisation(activity.getId())).withRel("organisation"));
    links.add(linkTo(methodOn(ActivityController.class)
        .findUser(activity.getId())).withRel("user"));
    links.add(linkTo(methodOn(ActivityController.class)
        .findCategory(activity.getId())).withRel("category"));
    links.add(linkTo(methodOn(ActivityController.class)
        .findSchedules(activity.getId(), null)).withRel("schedules"));
    links.add(linkTo(methodOn(ActivityController.class)
        .findTags(activity.getId())).withRel("tags"));
    links.add(linkTo(methodOn(ActivityController.class)
        .findTargetGroups(activity.getId())).withRel("targetgroups"));
    links.add(linkTo(methodOn(ActivityController.class)
        .findAddress(activity.getId())).withRel("address"));
    links.add(linkTo(methodOn(ActivityController.class)
        .findTranslations(activity.getId())).withRel("translations"));

    return links;
  }

}
