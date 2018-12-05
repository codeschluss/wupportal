package de.codeschluss.portal.core.i18n.translation;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.common.CrudController;
import de.codeschluss.portal.core.common.PagingAndSortingAssembler;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The Class TranslationResourceAssembler.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class TranslationResourceAssembler 
    extends PagingAndSortingAssembler<TranslatableEntity<?>> {


  CrudController<?,?> currentController;
  
  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common
   * .PagingAndSortingAssembler#createResourceLinks(de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  protected List<Link> createResourceLinks(TranslatableEntity<?> entity) {
    if (currentController == null) {
      throw new RuntimeException(
          "currentController has to be set explicitly before calling any assembler method");
    }
    
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(currentController.getClass())
        .findOne(entity.getId())).withSelfRel());

    return links;
  }
  
  public <C extends CrudController<?,?>> void setCurrentController(C controller) {
    this.currentController = controller;
  }

}