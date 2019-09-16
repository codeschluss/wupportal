package de.codeschluss.portal.core.api.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class BaseParams.
 * 
 * @author Valmir Etemi
 * 
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class BaseParams {

  /** The sort. */
  protected String sort;

  /** The dir. */
  protected String dir;

  /** The embeddings. */
  private String embeddings;
}