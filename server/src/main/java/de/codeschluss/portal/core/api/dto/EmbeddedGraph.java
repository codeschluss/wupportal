package de.codeschluss.portal.core.api.dto;

import java.util.List;

import lombok.Data;

/**
 * The Class EmbeddedGraph.
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class EmbeddedGraph {
  
  private String name;
  
  private List<EmbeddedGraph> nodes;

}
