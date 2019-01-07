package de.codeschluss.portal.core.api.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * The Class BooleanPrimitive.
 * 
 * @author Valmir Etemi
 *
 */
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class BooleanPrimitive {
  
  private boolean value;
  
  public void setValue(boolean value) {
    this.value = value;
  }
  
  public boolean getValue() {
    return this.value;
  }
}
