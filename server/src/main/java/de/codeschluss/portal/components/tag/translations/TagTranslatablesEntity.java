package de.codeschluss.portal.components.tag.translations;

import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

}