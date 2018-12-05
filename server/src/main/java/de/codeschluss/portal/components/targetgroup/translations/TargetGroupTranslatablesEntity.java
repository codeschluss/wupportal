package de.codeschluss.portal.components.targetgroup.translations;

import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;
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
@Table(name = "target_group_translatables")
@Relation(collectionRelation = "data")
public class TargetGroupTranslatablesEntity extends TranslatableEntity<TargetGroupEntity> {

  private static final long serialVersionUID = 1L;

  @Column(nullable = false)
  private String name;
 
}