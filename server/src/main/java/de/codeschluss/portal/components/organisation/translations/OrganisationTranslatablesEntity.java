package de.codeschluss.portal.components.organisation.translations;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
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

/**
 * The persistent class for the activities database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "organisation_translatables")
public class OrganisationTranslatablesEntity extends TranslatableEntity<OrganisationEntity> {

  private static final long serialVersionUID = 1L;
  
  @Lob
  @Column(columnDefinition = "TEXT", nullable = false)
  private String description;
}