package de.codeschluss.portal.core.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.List;
import java.util.Map;

import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;

/**
 * The Class BaseResource.
 * 
 * @author Valmir Etemi
 *
 */
@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
@Data
public abstract class BaseResource extends BaseEntity {
  
  private static final long serialVersionUID = 1L;
  
  @SuppressWarnings("unchecked")
  public <B extends BaseEntity> Resource<B> toResource() {
    return (Resource<B>) new Resource<>(this, createResourceLinks());
  }

  public abstract List<Link> createResourceLinks();
  
  @JsonProperty("_embedded")
  @Transient
  @JsonSerialize
  @JsonDeserialize
  @JsonInclude(Include.NON_NULL)
  protected Map<String,Object> embeddings;
}
