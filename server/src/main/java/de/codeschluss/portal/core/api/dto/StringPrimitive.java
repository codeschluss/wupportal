package de.codeschluss.portal.core.api.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class StringPrimitive.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class StringPrimitive {
  
  private String value;

}
