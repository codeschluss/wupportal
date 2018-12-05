package de.codeschluss.portal.components.activity.translations;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the activity translatable database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "activity_translatables")
@Relation(collectionRelation = "data")
public class ActivityTranslatablesEntity extends TranslatableEntity<ActivityEntity> {

  private static final long serialVersionUID = 1L;

  @Column(nullable = false)
  private String name;

  @Lob
  @Column(columnDefinition = "TEXT")
  private String description;
}