package de.codeschluss.portal.core.entity;

import java.util.List;

import javax.persistence.MappedSuperclass;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

/**
 * The Class BaseResource.
 * 
 * @author Valmir Etemi
 *
 */
@MappedSuperclass
public abstract class BaseResource extends BaseEntity {
  
  private static final long serialVersionUID = 1L;
  
  @SuppressWarnings("unchecked")
  public <B extends BaseEntity> Resource<B> toResource() {
    return (Resource<B>) new Resource<>(this, createResourceLinks());
  }

  public abstract List<Link> createResourceLinks();
}
