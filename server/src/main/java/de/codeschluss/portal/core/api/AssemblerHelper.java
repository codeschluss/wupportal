package de.codeschluss.portal.core.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.api.dto.EmbeddedGraph;
import de.codeschluss.portal.core.entity.BaseEntity;
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.security.Sensible;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Map;

import org.hibernate.collection.internal.AbstractPersistentCollection;
import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;

// TODO: Auto-generated Javadoc
/**
 * The Class AssemblerHelper.
 * 
 * @author Valmir Etemi
 */
@Component
public class AssemblerHelper {
  
  /**
   * Creates the embeddings from param.
   *
   * @param params
   *          the params
   * @return the embedded graph
   * @throws JsonParseException
   *           the json parse exception
   * @throws JsonMappingException
   *           the json mapping exception
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  public EmbeddedGraph createEmbeddingsFromParam(BaseParams params)
      throws JsonParseException, JsonMappingException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String decodedEmbeddding = new String(Base64Utils.decodeFromString(params.getEmbeddings()));
    return mapper.readValue(decodedEmbeddding, EmbeddedGraph.class);
  }
  
  /**
   * Checks if is valid sub resource.
   *
   * @param fieldValue
   *          the field value
   * @param field
   *          the field
   * @return true, if is valid sub resource
   */
  boolean isValidSubResource(Object fieldValue, Field field) {
    return fieldValue != null && field != null
        && BaseEntity.class.isAssignableFrom(fieldValue.getClass())
        && fieldValue.getClass().getDeclaredAnnotation(Sensible.class) == null;
  }
  
  /**
   * Checks if is valid sub list.
   *
   * @param fieldValue the field value
   * @param field the field
   * @return true, if is valid sub list
   */
  public boolean isValidSubList(Object fieldValue, Field field) {
    return fieldValue != null && field != null
        && AbstractPersistentCollection.class.isAssignableFrom(fieldValue.getClass());
  }

  /**
   * Resource with embeddable.
   *
   * @param <E> the element type
   * @param entity the entity
   * @param embeddables the embeddables
   * @return the resource
   */
  <E extends BaseResource> Resource<E> resourceWithEmbeddable(E entity,
      Map<String, Object> embeddables) {
    entity.setEmbeddings(embeddables);
    return new Resource<E>(entity, entity.createResourceLinks());
  }
  
  /**
   * To resource.
   *
   * @param entity the entity
   * @return the resource
   */
  public Resource<BaseResource> toResource(Object entity) {
    return ((BaseResource) entity).toResource();
  }
}
