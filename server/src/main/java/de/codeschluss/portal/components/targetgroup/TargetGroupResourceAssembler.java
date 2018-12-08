package de.codeschluss.portal.components.targetgroup;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The class TargetGroupResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class TargetGroupResourceAssembler extends PagingAndSortingAssembler<TargetGroupEntity> {

  @Override
  protected List<Link> createResourceLinks(TargetGroupEntity targetGroup) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(TargetGroupController.class)
        .readOne(targetGroup.getId())).withSelfRel());
    links.add(linkTo(methodOn(TargetGroupController.class)
        .readTranslations(targetGroup.getId())).withRel("translations"));

    return links;
  }
}
