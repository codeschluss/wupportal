package de.codeschluss.portal.core.i18n.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import org.springframework.hateoas.core.Relation;

/**
 * Base entity for all translatables.
 * 
 * @author Valmir Etemi
 *
 */
@MappedSuperclass
@Relation(collectionRelation = "data")
public abstract class TranslatableEntity<P extends BaseResource> extends BaseResource {

  private static final long serialVersionUID = 1L;
  
  @ManyToOne(fetch = FetchType.EAGER)
  @JsonIgnore
  protected LanguageEntity language;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnore
  @JoinColumn(name = "parent_id", nullable = false)
  protected P parent;

}
