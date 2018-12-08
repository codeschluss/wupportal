package de.codeschluss.portal.components.schedule;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * The Class ScheduleResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
@Transactional
public class ScheduleResourceAssembler extends PagingAndSortingAssembler<ScheduleEntity> {

  @Override
  protected List<Link> createResourceLinks(ScheduleEntity schedule) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(ActivityController.class)
        .findSchedules(schedule.getActivity().getId(), null)).withSelfRel());

    return links;
  }
}
