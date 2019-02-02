package de.codeschluss.portal.components.address.bingmaps;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

/**
 * The Class Address.
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class Address {

  private String addressLine;
  private String adminDistrict;
  private String adminDistrict2;
  private String countryRegion;
  private String formattedAddress;
  private String locality;
  private String postalCode;
  private Map<String, Object> additionalProperties = new HashMap<String, Object>();

  public String getStreet() {
    return addressLine.split(" ")[0];
  }

  public String getHousenumber() {
    return addressLine.split(" ")[1];
  }

}
