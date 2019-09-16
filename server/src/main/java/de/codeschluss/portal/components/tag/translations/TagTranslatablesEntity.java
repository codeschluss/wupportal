package de.codeschluss.portal.components.tag.translations;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.components.tag.TagController;
import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the tag translatables database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "tag_translatables")
@Relation(collectionRelation = "data")
public class TagTranslatablesEntity extends TranslatableEntity<TagEntity> {

  private static final long serialVersionUID = 1L;

  @Column(nullable = false)
  private String name;
  
  public void setName(String name) {
    // TODO: More preparations
    this.name = name.trim();
  }
  
  @Override
  public List<Link> createResourceLinks() {    
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(TagController.class)
        .readTranslations(parent.getId())).withSelfRel());

    return links;
  }

}