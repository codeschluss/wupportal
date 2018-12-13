package de.codeschluss.portal.core.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.api.dto.EmbeddedGraph;
import de.codeschluss.portal.core.entity.BaseEntity;
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.security.Sensible;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
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
  public List<EmbeddedGraph> createEmbeddingsFromParam(BaseParams params)
      throws JsonParseException, JsonMappingException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String decodedEmbeddding = new String(Base64Utils.decodeFromString(params.getEmbeddings()));
    return mapper.readValue(decodedEmbeddding, new TypeReference<List<EmbeddedGraph>>(){});
  }
  
  /**
   * Gets the field value.
   *
   * @param fieldName the field name
   * @param entity the entity
   * @return the field value
   */
  public Object getFieldValue(String fieldName, Object entity) {
    try {
      return new PropertyDescriptor(fieldName, entity.getClass()).getReadMethod()
          .invoke(entity);
    } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException
        | IntrospectionException | SecurityException e) {
      return null;
    }
  }
  
  /**
   * Checks if is valid sub resource.
   *
   * @param fieldValue the field value
   * @return true, if is valid sub resource
   */
  boolean isValidSubResource(Object fieldValue) {
    return fieldValue != null
        && BaseEntity.class.isAssignableFrom(fieldValue.getClass())
        && fieldValue.getClass().getDeclaredAnnotation(Sensible.class) == null;
  }
  
  /**
   * Checks if is valid sub list.
   *
   * @param fieldValue the field value
   * @return true, if is valid sub list
   */
  public boolean isValidSubList(Object fieldValue) {
    return fieldValue != null
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
