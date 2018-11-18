package de.codeschluss.portal.core.utils;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.domain.Sort;

// TODO: Auto-generated Javadoc
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class SortPaginate {

  /** The page. */
  private Integer page;
  
  /** The size. */
  private Integer size;
  
  /** The sort. */
  private String sort;
  
  /** The dir. */
  private String dir;

  /**
   * Creates the sort.
   *
   * @param defaultValue the default value
   * @return the sort
   */
  public Sort createSort(String defaultValue) {
    Sort.Direction direction = dir == null || dir.equals(Sort.Direction.ASC.toString())
        ? Sort.Direction.ASC
        : Sort.Direction.DESC;
    sort = sort == null || sort.isEmpty() ? defaultValue : sort;

    return new Sort(direction, sort);
  }

}
