package de.codeschluss.portal.components.tag;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.tag.QTagEntity;
import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class TagQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class TagQueryBuilder extends QueryBuilder<QTagEntity> {
  
  /** The language service. */
  private final LanguageService languageService;
  
  /**
   * Instantiates a new tag query builder.
   */
  public TagQueryBuilder(LanguageService languageService) {
    super(QTagEntity.tagEntity);
    this.languageService = languageService;
  }
  
  /**
   * With name.
   *
   * @param name the name
   * @return the boolean expression
   */
  public BooleanExpression withName(String name) {
    return query.translatables.any().language.locale.in(languageService.getCurrentReadLocales())
        .and(query.translatables.any().name.eq(name));
  }

  /**
   * With any activity id.
   *
   * @param activityId the activity id
   * @return the predicate
   */
  public Predicate withAnyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }
  
  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common.
   * QueryBuilder#fuzzySearch(de.codeschluss.portal.core.utils.FilterSortPaginate)
   */
  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.description.likeIgnoreCase(filter)
        .or(likeName(filter));
  }

  private BooleanExpression likeName(String filter) {
    return query.translatables.any().name.likeIgnoreCase(filter)
        .and(query.translatables.any().language.locale.in(languageService.getCurrentReadLocales()));
  }
}
