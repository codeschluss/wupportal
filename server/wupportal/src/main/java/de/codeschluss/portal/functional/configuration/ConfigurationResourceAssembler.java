package de.codeschluss.portal.functional.configuration;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.PagingAndSortingAssembler;
import de.codeschluss.portal.functional.configuration.ConfigurationController;
import de.codeschluss.portal.functional.configuration.ConfigurationEntity;

@Service
public class ConfigurationResourceAssembler extends PagingAndSortingAssembler<ConfigurationEntity> {

	@Override
	protected List<Link> createResourceLinks(ConfigurationEntity configuration) {
		List<Link> links = new ArrayList<Link>();
		
		links.add(linkTo(methodOn(ConfigurationController.class).findOne(configuration.getId())).withSelfRel());
		
		return links;
	}
}
