package de.codeschluss.portal.core.i18n.language;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.core.entity.BaseResource;

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
 * The persistent class for the languages database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "languages")
@Relation(collectionRelation = "data")
public class LanguageEntity extends BaseResource {
  
  private static final long serialVersionUID = 1L;

  @Column(nullable = false, unique = true)
  private String locale;

  @Column(nullable = false, unique = true)
  private String name;
  
  private String machineTranslated;
  
  @Override
  public List<Link> createResourceLinks() {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(LanguageController.class)
        .readOne(getId())).withSelfRel());

    return links;
  }
}