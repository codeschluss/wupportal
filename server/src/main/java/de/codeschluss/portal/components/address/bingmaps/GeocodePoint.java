package de.codeschluss.portal.components.address.bingmaps;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

/**
 * The Class GeocodePoint.
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class GeocodePoint {

  private String type;
  private List<Double> coordinates = null;
  private String calculationMethod;
  private List<String> usageTypes = null;
  private Map<String, Object> additionalProperties = new HashMap<String, Object>();

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public List<Double> getCoordinates() {
    return coordinates;
  }

  public void setCoordinates(List<Double> coordinates) {
    this.coordinates = coordinates;
  }

  public String getCalculationMethod() {
    return calculationMethod;
  }

  public void setCalculationMethod(String calculationMethod) {
    this.calculationMethod = calculationMethod;
  }

  public List<String> getUsageTypes() {
    return usageTypes;
  }

  public void setUsageTypes(List<String> usageTypes) {
    this.usageTypes = usageTypes;
  }

  public Map<String, Object> getAdditionalProperties() {
    return this.additionalProperties;
  }

  public void setAdditionalProperty(String name, Object value) {
    this.additionalProperties.put(name, value);
  }

}
