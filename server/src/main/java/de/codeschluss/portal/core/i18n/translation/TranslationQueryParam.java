package de.codeschluss.portal.core.i18n.translation;

import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//TODO: Auto-generated Javadoc
/**
* The Class TranslationQueryParam.
* 
* @author Valmir Etemi
*
*/
@Data
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
public class TranslationQueryParam {
 
  private String source;
  private List<String> targets;
}
