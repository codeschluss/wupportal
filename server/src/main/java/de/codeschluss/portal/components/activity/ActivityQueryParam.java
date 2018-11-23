package de.codeschluss.portal.components.activity;

import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The Class ActivityQueryParam.
 */
// TODO: Auto-generated Javadoc

/* (non-Javadoc)
 * @see de.codeschluss.portal.core.utils.FilterSortPaginate#toString()
 */
@Data

/* (non-Javadoc)
 * @see de.codeschluss.portal.core.utils.FilterSortPaginate#hashCode()
 */
@EqualsAndHashCode(callSuper = true)

/**
 * Instantiates a new activity query param.
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class ActivityQueryParam extends FilterSortPaginate {

  /** The current. */
  protected Boolean current;
  
  /** The categories. */
  protected List<String> categories;
  
  /** The suburbs. */
  protected List<String> suburbs;
  
  /** The targetgroups. */
  protected List<String> targetgroups;

  /**
   * Instantiates a new activity query param.
   *
   * @param filter the filter
   * @param page the page
   * @param size the size
   * @param sort the sort
   * @param dir the dir
   * @param current the current
   * @param categories the categories
   * @param suburubs the suburubs
   * @param targetgroups the targetgroups
   */
  public ActivityQueryParam(
      String filter, 
      Integer page, 
      Integer size, 
      String sort,
      String dir, 
      Boolean current,
      List<String> categories,
      List<String> suburubs,
      List<String> targetgroups) {
    super(filter, page, size, sort, dir);
    this.current = current;
    this.categories = categories;
    this.suburbs = suburubs;
    this.targetgroups = targetgroups;
  }
  
  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.utils.FilterSortPaginate#isEmptyQuery()
   */
  @Override
  public boolean isEmptyQuery() {
    return (filter == null || filter.isEmpty())
        && (current == null || !current)
        && (categories == null || categories.isEmpty())
        && (suburbs == null || suburbs.isEmpty())
        && (targetgroups == null || targetgroups.isEmpty());
  }  
}
