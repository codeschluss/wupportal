package de.codeschluss.portal.core.api.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The Class FilterSortPaginate.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class FilterSortPaginate extends SortPaginate {

  protected String filter;

  public FilterSortPaginate(
      String filter, 
      Integer page, 
      Integer size, 
      String sort, 
      String dir) {
    super(page, size, sort, dir);
    this.filter = filter;
  }
  
  public boolean isEmptyQuery() {
    return filter == null || filter.isEmpty();
  }
}
