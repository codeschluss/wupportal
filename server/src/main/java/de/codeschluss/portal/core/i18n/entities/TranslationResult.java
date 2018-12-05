package de.codeschluss.portal.core.i18n.entities;

import java.util.Map;

import lombok.Data;

/**
 * The Class TranslationResult. 
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class TranslationResult {
  
  private String lang;
  private Map<String,String> translations;

}
