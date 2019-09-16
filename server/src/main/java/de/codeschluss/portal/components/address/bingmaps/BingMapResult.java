package de.codeschluss.portal.components.address.bingmaps;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

/**
 * The Class BingMapResult.
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class BingMapResult {

  private String authenticationResultCode;
  private String brandLogoUri;
  private String copyright;
  private List<ResourceSet> resourceSets = null;
  private Integer statusCode;
  private String statusDescription;
  private String traceId;
  private Map<String, Object> additionalProperties = new HashMap<String, Object>();
}
