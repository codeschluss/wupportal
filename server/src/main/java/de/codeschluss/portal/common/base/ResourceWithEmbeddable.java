package de.codeschluss.portal.common.base;

import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.core.EmbeddedWrapper;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

public class ResourceWithEmbeddable<E> extends Resource<E> {

    @JsonUnwrapped
    private Resources<EmbeddedWrapper> embeddings;

    public ResourceWithEmbeddable(final E content, final Iterable<EmbeddedWrapper> embeddings, final List<Link> links) {
        super(content, links);
        this.embeddings = new Resources<>(embeddings);
    }

}
