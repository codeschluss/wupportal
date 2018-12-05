package de.codeschluss.portal.core.i18n.language;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.i18n.language.QLanguageEntity;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;

import org.springframework.stereotype.Service;

/**
 * The Class LanguageQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class LanguageQueryBuilder extends QueryBuilder<QLanguageEntity> {
  
  public LanguageQueryBuilder() {
    super(QLanguageEntity.languageEntity);
  }
  

  /**
   * With locale or language.
   *
   * @param locale the locale
   * @param name the name
   * @return the boolean expression
   */
  public BooleanExpression withLocaleOrLanguage(String locale, String name) {
    return withLocale(locale).or(withName(name));
  }
  
  /**
   * With locale.
   *
   * @param locale the locale
   * @return the boolean expression
   */
  public BooleanExpression withLocale(String locale) {
    return query.locale.eq(locale);
  }
  

  /**
   * With locale in.
   *
   * @param locales the locales
   * @return the boolean expression
   */
  public BooleanExpression withLocaleIn(List<String> locales) {
    return query.locale.in(locales);
  }
  
  /**
   * With name.
   *
   * @param name the name
   * @return the boolean expression
   */
  public BooleanExpression withName(String name) {
    return query.name.eq(name);
  }

  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common
   * .QueryBuilder#search(de.codeschluss.portal.core.utils.FilterSortPaginate)
   */
  @Override
  public <P extends FilterSortPaginate> Predicate search(P params) {
    String filter = prepareFilter(params.getFilter());
    return query.name.likeIgnoreCase(filter)
        .or(query.locale.likeIgnoreCase(filter));
  }
}
