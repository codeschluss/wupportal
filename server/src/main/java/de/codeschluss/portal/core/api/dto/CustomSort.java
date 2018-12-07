package de.codeschluss.portal.core.api.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.domain.Sort;

/**
 * The Class CustomSort.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class CustomSort {
  
  
  /** The sort. */
  protected String sort;
  
  /** The dir. */
  protected String dir;
  
  /**
   * Creates the sort.
   *
   * @param defaultSortProp the default sort prop
   * @return the sort
   */
  public Sort createSort(String defaultSortProp) {
    Sort.Direction direction = 
        dir == null || dir.trim().toLowerCase().equals(Sort.Direction.ASC.toString().toLowerCase())
        ? Sort.Direction.ASC
        : Sort.Direction.DESC;
    sort = sort == null || sort.isEmpty() ? defaultSortProp : sort;

    return new Sort(direction, sort);
  }
}
