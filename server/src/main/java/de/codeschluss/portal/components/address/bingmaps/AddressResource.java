package de.codeschluss.portal.components.address.bingmaps;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

/**
 * The Class AddressResource.
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class AddressResource {

  private String type;
  private List<Double> bbox = null;
  private String name;
  private Point point;
  private Address address;
  private String confidence;
  private String entityType;
  private List<GeocodePoint> geocodePoints = null;
  private List<String> matchCodes = null;
  private Map<String, Object> additionalProperties = new HashMap<String, Object>();
}
