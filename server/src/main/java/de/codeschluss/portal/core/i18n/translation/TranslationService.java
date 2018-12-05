package de.codeschluss.portal.core.i18n.translation;

import de.codeschluss.portal.core.common.DataRepository;
import de.codeschluss.portal.core.i18n.entities.LocalizedEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.utils.RepositoryService;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Optional;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
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
      List<?> list = TranslationHelper.convertToList(result);
      if (!list.isEmpty() && TranslationHelper.isLocalizable(list.get(0))) {
        List<String> locales = languageService.getCurrentReadLocales();
        for (Object entity : list) {
          localizeOne(entity, locales);
        }
      }
    }
    return result;
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
      if (TranslationHelper.isLocalizable(entity)) {
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
    for (String locale : locales) {
      boolean isTouched = TranslationHelper.localize(entity, locale);
      if (isTouched) {
        return;
      }
    }
    TranslationHelper.localize(entity, languageService.getDefaultLocale());
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
  public <E extends LocalizedEntity<?>> Object saveTranslation(ProceedingJoinPoint pjp) 
      throws Throwable {
    pjp.proceed();
    Object savedEntity = pjp.getArgs()[0];
    if (TranslationHelper.isLocalizable(savedEntity)) {
      TranslatableEntity<?> translatableObject = 
          createTranslatableObject((E) savedEntity, languageService.getCurrentWriteLanguage());  
      
      repoService.save(translatableObject);
    }
    return savedEntity;
  }
  
  /**
   * Creates the translatable object.
   *
   * @param translatableClass the translatable class
   * @param savedEntity the saved entity
   * @return the object
   * @throws Throwable the throwable
   */
  private TranslatableEntity<?> createTranslatableObject(
      LocalizedEntity<?> savedEntity, 
      LanguageEntity lang) throws Throwable {
    
    Class<TranslatableEntity<?>> translatableClass = 
        TranslationHelper.getTranslatableType(savedEntity);
    
    TranslatableEntity<?> translatableObject = 
        getTranslatableInstance(translatableClass, lang, savedEntity);
    
    TranslationHelper.setTranslations(translatableObject, savedEntity, lang);
    
    return translatableObject;
  }

  /**
   * Gets the translatable instance.
   *
   * @param <T> the generic type
   * @param translatableClass the translatable class
   * @param currentWriteLanguage the current write language
   * @param parent the parent
   * @return the translatable instance
   * @throws Throwable the throwable
   */
  private <T extends TranslatableEntity<?>> TranslatableEntity<?> getTranslatableInstance(
      Class<TranslatableEntity<?>> translatableClass, 
      LanguageEntity currentWriteLanguage,
      Object parent) throws Throwable {
    DataRepository<T> repo = repoService.getRepository(translatableClass);
    if (repo instanceof TranslationRepository<?>) {
      TranslationRepository<?> translationRepo = (TranslationRepository<?>) repo;
      Method method = translationRepo
          .getClass()
          .getMethod("findByLanguageAndParent", 
              LanguageEntity.class, 
              parent.getClass().getSuperclass());
      TranslatableEntity<?> existingTranslatable = (TranslatableEntity<?>)
          method.invoke(translationRepo, currentWriteLanguage, parent);
      
      return existingTranslatable != null
          ? existingTranslatable
          : translatableClass.newInstance();
    }
    throw new RuntimeException(
        "Repository of Translation must inherit from " + TranslationRepository.class);
  }
}
