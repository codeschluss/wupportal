package de.codeschluss.portal.core.api.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
