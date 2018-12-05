package de.codeschluss.portal.core.i18n.language;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.i18n.language.QLanguageEntity;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

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
  
  public BooleanExpression withLocale(String locale) {
    return query.locale.eq(locale);
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
