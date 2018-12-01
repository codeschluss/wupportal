package de.codeschluss.portal.core.translations;

import java.io.Serializable;
import java.util.List;

import org.hibernate.EmptyInterceptor;
import org.hibernate.collection.internal.PersistentBag;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

/**
 * Intercepts database calls to localize entities.
 * 
 * @author Valmir Etemi
 *
 */
@Component
public class TranslationInterceptor extends EmptyInterceptor {

  @Autowired
  @Lazy
  private TranslationService translationService;

  private static final long serialVersionUID = 1L;

  @Override
  public boolean onLoad(
      Object entity, 
      Serializable id, 
      Object[] state, 
      String[] propertyNames,
      Type[] types) {
    return isLocalizable(entity)
        ? translationService.localizeOnLoad(entity, getTranslatables(entity, state))
        : false;
  }

  @Override
  public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames,
      Type[] types) {
    return false;
  }
  
  private boolean isLocalizable(Object entity) {
    return entity.getClass().getAnnotation(Localized.class) != null;
  }
  
  /**
   * Gets the translatables.
   * @param entity 
   *
   * @param state the state
   * @return the translatables
   */
  private List<?> getTranslatables(Object entity, Object[] state) {
    for (Object property : state) {
      if (isTranslatable(property)) {
        return (PersistentBag) property;
      }
    }
    throw new RuntimeException(
        "Missing Translatable Entity for given entity: " + entity.getClass());
  }
  
  /**
   * Checks if is translatable.
   *
   * @param property the property
   * @return true, if is translatable
   */
  private boolean isTranslatable(Object property) {
    if (property instanceof PersistentBag) {
      PersistentBag bagProp = (PersistentBag) property;
      // get arbitrary element to determine if list is of translatables
      return !bagProp.isEmpty()
          ? bagProp.get(0).getClass().getAnnotation(Translatable.class) != null
          : false;
    }
    return false;
  }

}
