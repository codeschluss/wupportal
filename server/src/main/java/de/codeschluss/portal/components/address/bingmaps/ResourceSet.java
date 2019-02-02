package de.codeschluss.portal.components.address.bingmaps;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

/**
 * The Class ResourceSet.
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class ResourceSet {

  private Integer estimatedTotal;
  private List<AddressResource> resources = null;
  private Map<String, Object> additionalProperties = new HashMap<String, Object>();
  
}
