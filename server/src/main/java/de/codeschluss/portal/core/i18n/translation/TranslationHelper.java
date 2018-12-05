package de.codeschluss.portal.core.i18n.translation;

import de.codeschluss.portal.core.i18n.annotations.Translatables;
import de.codeschluss.portal.core.i18n.entities.LocalizedEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Id;

import org.springframework.data.domain.Page;

/**
 * Helper Class for converting and processing of translations.
 * 
 * @author Valmir Etemi
 *
 */
public class TranslationHelper {
  
  /**
   * Creates the iterable.
   *
   * @param result the result
   * @return the iterable
   */
  public static List<?> convertToList(Object result) {
    return result instanceof Page<?>
      ? ((Page<?>) result).getContent()
      : (List<?>) result;
  }

  /**
   * Checks if is localizable.
   *
   * @param entity the entity
   * @return true, if is localizable
   */
  public static boolean isLocalizable(Object entity) {
    return entity != null && LocalizedEntity.class.isAssignableFrom(entity.getClass());
  }
  
  /**
   * Localize.
   *
   * @param entity the entity
   * @param locale the locale
   * @return true, if successful
   * @throws Throwable the throwable
   */
  public static boolean localize(Object entity, String locale) throws Throwable {
    Map<String, String> translations = mapTranslations(getTranslatableProperty(entity), locale);
    boolean touched = false;
    if (translations == null) {
      return touched;
    }

    for (Field field : entity.getClass().getDeclaredFields()) {
      field.setAccessible(true);
      String translation = translations.get(field.getName());
      if (translation != null) {
        field.set(entity, translation);
        touched = true;
      }
    }
    return touched;
  }
  
  /**
   * Gets the translatables.
   *
   * @param entity the entity
   * @return the translatables
   * @throws IllegalArgumentException the illegal argument exception
   * @throws IllegalAccessException the illegal access exception
   */
  public static List<?> getTranslatableProperty(Object entity) 
       throws Throwable {
    for (Field field : entity.getClass().getSuperclass().getDeclaredFields()) {
      if (field.getAnnotation(Translatables.class) != null) {
        field.setAccessible(true);
        return (List<?>) field.get(entity);
      }
    }
    throw new RuntimeException(
        "Missing TranslatableEntity Entity for given entity: " + entity.getClass());
  }
  
  /**
   * Gets the translations.
   *
   * @param translatables the translatables
   * @param locale the locale
   * @return the translations
   */
  public static Map<String, String> mapTranslations(List<?> translatables, String locale)
      throws Throwable {
    for (Object translatable : translatables) {
      Map<String, String> translations = new HashMap<>();
      if (languageMatched(locale, translatable)) {
        for (Field field : translatable.getClass().getDeclaredFields()) {
          field.setAccessible(true);
          Object fieldValue = field.get(translatable);
          
          if (fieldValue instanceof String) {
            translations.put(field.getName(), fieldValue.toString());
          }
        }
        return translations;
      }

    }
    return null;
  }

  /**
   * Language matched.
   *
   * @param locale the locale
   * @param translatable the translatable
   * @return true, if successful
   * @throws Throwable the throwable
   */
  private static boolean languageMatched(String locale, Object translatable) throws Throwable {
    for (Field field : translatable.getClass().getSuperclass().getDeclaredFields()) {
      field.setAccessible(true);
      Object fieldValue = field.get(translatable);    
      if (fieldValue instanceof LanguageEntity) {
        LanguageEntity language = (LanguageEntity) fieldValue;
        return language.getLocale().equals(locale);
      }
    }
    return false;
  }
  
  /**
   * Gets the translatable type.
   *
   * @param entity the entity
   * @return the translatable type
   */
  @SuppressWarnings("unchecked")
  public static Class<TranslatableEntity<?>> getTranslatableType(LocalizedEntity<?> entity) {
    Type translatableType = entity.getClass().getGenericSuperclass();
    if (translatableType instanceof ParameterizedType) {
      ParameterizedType pt = (ParameterizedType) translatableType;
      Class<?> genericType = (Class<?>) pt.getActualTypeArguments()[0];
      if (TranslatableEntity.class.isAssignableFrom(genericType)) {
        return (Class<TranslatableEntity<?>>) genericType;
      }
    }
    throw new RuntimeException(
        "Missing TranslatableEntity Entity for given entity: " + entity.getClass());
  }


  /**
   * Fill translations.
   *
   * @param translatableObject the translatable object
   * @param savedEntity the saved entity
   * @param lang the lang
   * @throws Throwable the throwable
   */
  public static void setTranslations(
      TranslatableEntity<?> translatableObject, 
      LocalizedEntity<?> savedEntity,
      LanguageEntity lang) throws Throwable {
    setParentProperties(translatableObject, savedEntity, lang);
    setTranslationFields(translatableObject, savedEntity);
  }

  /**
   * Fill parent properties.
   *
   * @param translatableObject the translatable object
   * @param savedEntity the saved entity
   * @param lang the lang
   * @throws Throwable the throwable
   */
  private static void setParentProperties(
      TranslatableEntity<?> translatableObject,
      LocalizedEntity<?> savedEntity,
      LanguageEntity lang) throws Throwable {
    for (Field field : translatableObject.getClass().getSuperclass().getDeclaredFields()) {
      field.setAccessible(true);
      if (field.getType().isAssignableFrom(LanguageEntity.class)) {
        field.set(translatableObject, lang);
      }
      if (field.getType().isAssignableFrom(savedEntity.getClass())) {
        field.set(translatableObject, savedEntity);
      }
    }
  }
  
  /**
   * Fill translation fields.
   *
   * @param translatableObject the translatable object
   * @param savedEntity the saved entity
   * @throws Throwable the throwable
   */
  private static void setTranslationFields(
      TranslatableEntity<?> translatableObject,
      LocalizedEntity<?> savedEntity) throws Throwable {
    for (Field field : translatableObject.getClass().getDeclaredFields()) {
      field.setAccessible(true);
      if (!isId(field) && field.getType().isAssignableFrom(String.class)) {
        field.set(
            translatableObject, 
            getCurrentTranslationFromEntity(savedEntity, field.getName()));
      }
    }
  }

  /**
   * Checks if is id field.
   *
   * @param field the field
   * @return true, if is id
   */
  public static boolean isId(Field field) {
    return field.getAnnotation(Id.class) != null;
  }
  


  /**
   * Gets the current translation from entity.
   *
   * @param entity the entity
   * @param translatableFieldName the translatable field name
   * @return the current translation from entity
   * @throws Throwable the throwable
   */
  public static String getCurrentTranslationFromEntity(Object entity, String translatableFieldName)
      throws Throwable {
    Field field = entity.getClass().getDeclaredField(translatableFieldName);
    field.setAccessible(true);
    return (String) field.get(entity);
  }

}
