package de.codeschluss.portal.core.api.dto;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import de.codeschluss.portal.core.entity.BaseResource;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.core.EmbeddedWrapper;

/**
 * The Class ResourceWithEmbeddable.
 * 
 * @author Valmir Etemi
 *
 */
public class ResourceWithEmbeddable<E extends BaseResource> extends Resource<E> {

  @JsonUnwrapped
  private Resources<EmbeddedWrapper> embeddings;

  public ResourceWithEmbeddable(final E content, final Iterable<EmbeddedWrapper> embeddings) {
    super(content, content.createResourceLinks());
    this.embeddings = new Resources<>(embeddings);
  }

}
