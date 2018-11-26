package de.codeschluss.portal.components.configuration;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.components.configuration.ConfigurationController;
import de.codeschluss.portal.components.configuration.ConfigurationEntity;
import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class ConfigurationResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ConfigurationResourceAssembler extends PagingAndSortingAssembler<ConfigurationEntity> {

  @Override
  protected List<Link> createResourceLinks(ConfigurationEntity configuration) {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(ConfigurationController.class)
        .findOne(configuration.getId())).withSelfRel());

    return links;
  }
}
