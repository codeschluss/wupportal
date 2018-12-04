package de.codeschluss.portal.core.translations;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.core.common.DataRepository;
import de.codeschluss.portal.core.translations.annotations.Localized;
import de.codeschluss.portal.core.translations.annotations.Translatable;
import de.codeschluss.portal.core.translations.language.LanguageEntity;
import de.codeschluss.portal.core.translations.language.LanguageService;
import de.codeschluss.portal.core.utils.RepositoryService;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.Id;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

// TODO: Auto-generated Javadoc
/**
 * The Class TranslationService.
 * 
 * @author Valmir Etemi
 *
 * @param <E>
 *          the element type
 */
@Component
@Aspect 
public class TranslationService {
  
  @Pointcut("execution(* de.codeschluss.portal.core.common.DataRepository+.save(..))")
  private void save() { }
  
  @Pointcut("execution(public * de.codeschluss.portal.core.common.DataRepository+.findOne(..))")
  private void findOne() { }
  
  @Pointcut("execution(* de.codeschluss.portal.core.common.DataRepository+.findAll(..))")
  private void findAll() { }
  
  /** The repo service. */
  @Autowired
  private RepositoryService repoService;
  
  /** The language service. */
  @Autowired
  private LanguageService languageService; 

  /**
   * Replace iterable with translations.
   *
   * @param pjp the pjp
   * @return the object
   * @throws Throwable the throwable
   */
  @Around("findAll()")
  public Object replaceIterableWithTranslations(ProceedingJoinPoint pjp) throws Throwable {
    Object result = pjp.proceed();
    if (result instanceof Iterable<?>) {
      List<?> list = convertToList(result);
      if (!list.isEmpty() && isLocalizable(list.get(0))) {
        List<String> locales = languageService.getCurrentReadLocales();
        for (Object entity : list) {
          localizeOne(entity, locales);
        }
      }
    }
    return result;
  }
  
  /**
   * Creates the iterable.
   *
   * @param result the result
   * @return the iterable
   */
  private List<?> convertToList(Object result) {
    return result instanceof Page<?>
      ? ((Page<?>) result).getContent()
      : (List<?>) result;
  }

  /**
   * Replace one with translation.
   *
   * @param pjp the pjp
   * @return the object
   * @throws Throwable the throwable
   */
  @Around("findOne()")
  public Object replaceOneWithTranslation(ProceedingJoinPoint pjp) throws Throwable {
    Object result = pjp.proceed();
    if (result instanceof Optional<?> && ((Optional<?>) result).isPresent()) {
      Object entity = ((Optional<?>) result).get();
      if (isLocalizable(entity)) {
        localizeOne(entity, languageService.getCurrentReadLocales());
        return Optional.of(entity);
      }
    }
    return result;
  }

  /**
   * Localize one.
   *
   * @param entity the entity
   * @return the optional
   * @throws Throwable the throwable
   */
  private void localizeOne(Object entity, List<String> locales) 
       throws Throwable {
    List<?> translatables = getTranslatables(entity);
    for (String locale : locales) {
      boolean isTouched = localize(entity, getTranslations(translatables, locale));
      if (isTouched) {
        return;
      }
    }
    localize(entity, getTranslations(translatables, languageService.getDefaultLocale()));
  }

  /**
   * Gets the translatables.
   *
   * @param entity the entity
   * @return the translatables
   * @throws IllegalArgumentException the illegal argument exception
   * @throws IllegalAccessException the illegal access exception
   */
  private List<?> getTranslatables(Object entity) 
       throws IllegalArgumentException, IllegalAccessException {
    for (Field field : entity.getClass().getDeclaredFields()) {
      Class<?> type = getTranslatableType(field.getGenericType());
      if (type != null) {
        field.setAccessible(true);
        return (List<?>) field.get(entity);
      }
    }
    throw new RuntimeException(
        "Missing Translatable Entity for given entity: " + entity.getClass());
  }

  /**
   * Gets the translations.
   *
   * @param translatables the translatables
   * @param locale the locale
   * @return the translations
   */
  private Map<String, String> getTranslations(List<?> translatables, String locale)
      throws Throwable {
    for (Object translatable : translatables) {
      Map<String, String> translations = new HashMap<>();
      boolean matched = false;
      for (Field field : translatable.getClass().getDeclaredFields()) {
        field.setAccessible(true);
        Object fieldValue = field.get(translatable);
        
        if (fieldValue instanceof String) {
          translations.put(field.getName(), fieldValue.toString());
        }
        
        if (fieldValue instanceof LanguageEntity) {
          LanguageEntity language = (LanguageEntity) fieldValue;
          matched = language.getLocale().equals(locale);
        }
      }
      if (matched) {
        return translations;
      }
    }
    return null;
  }

  /**
   * Localize.
   *
   * @param <E> the element type
   * @param <S> the generic type
   * @param entity the entity
   * @param defaultLocale the default locale
   * @return true, if successful
   */
  private boolean localize(Object entity, Map<String,String> translations) throws Throwable {
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
   * Save localizable.
   *
   * @param <E> the element type
   * @param pjp the pjp
   * @return the object
   * @throws Throwable the throwable
   */
  @SuppressWarnings("unchecked")
  @Around("save()")
  public <E extends BaseEntity> Object saveTranslation(ProceedingJoinPoint pjp) throws Throwable {
    pjp.proceed();
    Object savedEntity = pjp.getArgs()[0];
    if (isLocalizable(savedEntity)) {
      Class<?> translatableClass = getTranslatableTypeForEntity(savedEntity);
      Object translatableObject = 
          createTranslatableObject(translatableClass, savedEntity);  
      
      repoService.save((E) translatableObject);
    }
    return savedEntity;
  }
  
  /**
   * Checks if is localizable.
   *
   * @param entity the entity
   * @return true, if is localizable
   */
  private boolean isLocalizable(Object entity) {
    return entity != null && entity.getClass().getAnnotation(Localized.class) != null;
  }
  
  /**
   * Gets the translatable type.
   *
   * @param entity the entity
   * @return the translatable type
   */
  private Class<?> getTranslatableTypeForEntity(Object entity) {
    for (Field field : entity.getClass().getDeclaredFields()) {
      Class<?> translatableType = getTranslatableType(field.getGenericType());
      if (translatableType != null) {
        return translatableType;
      }
    }
    throw new RuntimeException(
        "Missing Translatable Entity for given entity: " + entity.getClass());
  }
  

  /**
   * Gets the translatable type for field.
   *
   * @param field the field
   * @return the translatable type for field
   */
  private Class<?> getTranslatableType(Type type) {
    if (type instanceof ParameterizedType) {
      ParameterizedType pt = (ParameterizedType) type;
      Class<?> genericType = (Class<?>) pt.getActualTypeArguments()[0];
      genericType.getAnnotations();
      if (genericType.getAnnotation(Translatable.class) != null) {
        return genericType;
      }
    }
    return null;
  }


  /**
   * Creates the translatable object.
   *
   * @param translatableClass the translatable class
   * @param savedEntity the saved entity
   * @return the object
   * @throws Throwable the throwable
   */
  private Object createTranslatableObject(Class<?> translatableClass, Object savedEntity) 
      throws Throwable {
    LanguageEntity lang = languageService.getCurrentWriteLanguage();
    Object translatableObject = getTranslatableInstance(translatableClass, lang, savedEntity);
    for (Field field : translatableClass.getDeclaredFields()) {
      field.setAccessible(true);
      if (field.getType().isAssignableFrom(LanguageEntity.class)) {
        field.set(translatableObject, lang);
      }
      if (field.getType().isAssignableFrom(savedEntity.getClass())) {
        field.set(translatableObject, savedEntity);
      }
      if (!isId(field) && field.getType().isAssignableFrom(String.class)) {
        field.set(
            translatableObject, 
            getCurrentTranslationFromEntity(savedEntity, field.getName()));
      }
    }
    return translatableObject;
  }
  

  private <E extends BaseEntity> Object getTranslatableInstance(
      Class<?> translatableClass, 
      LanguageEntity currentWriteLanguage,
      Object parent) throws Throwable {
    DataRepository<E> repo = repoService.getRepository(translatableClass);
    if (repo instanceof TranslationRepository<?>) {
      TranslationRepository<?> translationRepo = (TranslationRepository<?>) repo;
      Method method = translationRepo
          .getClass()
          .getMethod("findByLanguageAndParent", 
              LanguageEntity.class, 
              parent.getClass().getSuperclass());
      Object existingTranslatable = method.invoke(translationRepo, currentWriteLanguage, parent);
      
      return existingTranslatable != null
          ? existingTranslatable
          : translatableClass.newInstance();
    }
    throw new RuntimeException(
        "Repository of Translation must inherit from " + TranslationRepository.class);
    
  }

  /**
   * Checks if is id field.
   *
   * @param field the field
   * @return true, if is id
   */
  private boolean isId(Field field) {
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
  private String getCurrentTranslationFromEntity(Object entity, String translatableFieldName)
      throws Throwable {
    Field field = entity.getClass().getDeclaredField(translatableFieldName);
    field.setAccessible(true);
    return (String) field.get(entity);
  }
}
