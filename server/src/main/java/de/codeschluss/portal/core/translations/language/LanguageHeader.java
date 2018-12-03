package de.codeschluss.portal.core.translations.language;

import lombok.Data;

// TODO: Auto-generated Javadoc
/**
 * The Class LanguageHeader.
 *
 * @author Valmir Etemi
 */
@Data
public class LanguageHeader implements Comparable<LanguageHeader> {

  /** The language. */
  private String language;
  
  /** The value. */
  private double value;
  
  /**
   * Instantiates a new language header.
   *
   * @param unpreparedHeaderValue the unprepared header value
   */
  public LanguageHeader(String unpreparedHeaderValue) {
    String[] langValue = unpreparedHeaderValue.split(";");
    this.language = langValue[0].substring(0, 2);
    if (langValue.length == 1) {
      this.value = 1.0;
    } else {
      this.value = parseValue(langValue[1]);
    }
  }

  /**
   * Parses the value.
   *
   * @param langValue the lang value
   * @return the double
   */
  private double parseValue(String langValue) {
    try {
      return Double.parseDouble(langValue.replaceAll("q=", ""));
    } catch (NumberFormatException e) {
      return 0.0;
    }
  }

  /* (non-Javadoc)
   * @see java.lang.Comparable#compareTo(java.lang.Object)
   */
  @Override
  public int compareTo(LanguageHeader toCompare) {
    return Double.compare(this.getValue(), toCompare.getValue()); 
  }
}
