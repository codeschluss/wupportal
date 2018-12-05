package de.codeschluss.portal.core.i18n.translation;

import de.codeschluss.portal.core.i18n.entities.LocalizedEntity;

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
 * The Class TranslationInterceptor.
 * 
 * @author Valmir Etemi
 *
 * @param <E>
 *          the element type
 */
@Component
@Aspect
public class TranslationInterceptor {

  @Pointcut("execution(* de.codeschluss.portal.core.common.DataRepository+.save(..))")
  private void save() {
  }

  @Pointcut("execution(public * de.codeschluss.portal.core.common.DataRepository+.findOne(..))")
  private void findOne() {
  }

  @Pointcut("execution(* de.codeschluss.portal.core.common.DataRepository+.findAll(..))")
  private void findAll() {
  }

  /** The translation service. */
  @Autowired
  private TranslationService translationService;

  /**
   * Replace iterable with translations.
   *
   * @param pjp
   *          the pjp
   * @return the object
   * @throws Throwable
   *           the throwable
   */
  @Around("findAll()")
  public Object replaceIterableWithTranslations(ProceedingJoinPoint pjp) throws Throwable {
    Object result = pjp.proceed();
    if (result instanceof Iterable<?>) {
      List<?> list = TranslationHelper.convertToList(result);
      if (!list.isEmpty() && TranslationHelper.isLocalizable(list.get(0))) {
        translationService.localizeList(list);
      }
    }
    return result;
  }

  /**
   * Replace single with translation.
   *
   * @param pjp
   *          the pjp
   * @return the object
   * @throws Throwable
   *           the throwable
   */
  @Around("findOne()")
  public Object replaceSingleWithTranslation(ProceedingJoinPoint pjp) throws Throwable {
    Object result = pjp.proceed();
    if (result instanceof Optional<?> && ((Optional<?>) result).isPresent()) {
      Object entity = ((Optional<?>) result).get();
      if (TranslationHelper.isLocalizable(entity)) {
        translationService.localizeSingle(entity);
        return Optional.of(entity);
      }
    }
    return result;
  }

  /**
   * Save localizable.
   *
   * @param <E>
   *          the element type
   * @param pjp
   *          the pjp
   * @return the object
   * @throws Throwable
   *           the throwable
   */
  @Around("save()")
  public <E extends LocalizedEntity<?>> Object saveTranslation(ProceedingJoinPoint pjp)
      throws Throwable {
    pjp.proceed();
    Object savedEntity = pjp.getArgs()[0];
    if (TranslationHelper.isLocalizable(savedEntity)) {
      translationService.save(savedEntity);
    }
    return savedEntity;
  }
}
