package de.codeschluss.portal.core.i18n.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.core.i18n.annotations.Translatables;
import de.codeschluss.portal.core.service.BaseEntity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;

import lombok.ToString;

import org.springframework.hateoas.core.Relation;

/**
 * Base Entity for all localized entities.
 * 
 * @author Valmir Etemi
 *
 */
@MappedSuperclass
@Relation(collectionRelation = "data")
public class LocalizedEntity<T extends TranslatableEntity<?>> extends BaseEntity {

  private static final long serialVersionUID = 1L;
  
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  @Translatables
  protected List<T> translatables;
}
