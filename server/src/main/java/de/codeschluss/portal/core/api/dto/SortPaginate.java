package de.codeschluss.portal.core.api.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

// TODO: Auto-generated Javadoc
/**
 * The Class SortPaginate.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class SortPaginate extends CustomSort {

  /** The page. */
  protected Integer page;
  
  /** The size. */
  protected Integer size;
  
  /**
   * Instantiates a new sort paginate.
   *
   * @param page the page
   * @param size the size
   * @param sort the sort
   * @param dir the dir
   */
  public SortPaginate(
      Integer page, 
      String sort,
      Integer size,
      String dir) {
    super(sort, dir);
    this.page = page;
    this.size = size;
  }

}
