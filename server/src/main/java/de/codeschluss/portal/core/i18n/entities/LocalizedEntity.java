package de.codeschluss.portal.core.i18n.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.core.i18n.annotations.Translatables;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;

import lombok.ToString;

/**
 * Base Entity for all localized entities.
 * 
 * @author Valmir Etemi
 *
 */
@MappedSuperclass
public class LocalizedEntity<T extends TranslatableEntity<?>> extends BaseEntity {

  private static final long serialVersionUID = 1L;
  
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  @Translatables
  protected List<T> translatables;
}
