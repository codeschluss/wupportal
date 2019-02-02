package de.codeschluss.portal.components.address.bingmaps;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

/**
 * The Class Point.
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class Point {

  private String type;
  private List<Float> coordinates = null;
  private Map<String, Object> additionalProperties = new HashMap<String, Object>();

  public float getLatitude() {
    return coordinates.get(0);
  }

  public float getLongitude() {
    return coordinates.get(1);
  }

}
