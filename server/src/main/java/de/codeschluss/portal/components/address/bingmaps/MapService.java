/**
 * 
 */
package de.codeschluss.portal.components.address.bingmaps;

import de.codeschluss.portal.components.address.AddressConfiguration;
import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.core.exception.NotFoundException;
import java.net.URI;
import javax.naming.ServiceUnavailableException;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * The Class MapService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class MapService {

  /** The config. */
  private final AddressConfiguration config;

  /** The geo location client. */
  private final WebClient geoLocationClient;

  public MapService(AddressConfiguration config) {
    this.config = config;
    this.geoLocationClient = WebClient.create();
  }

  /**
   * Retrieve external address.
   *
   * @param newAddress the new address
   * @return the address entity
   * @throws ServiceUnavailableException the service unavailable exception
   */
  public AddressEntity retrieveExternalAddress(AddressEntity newAddress)
      throws ServiceUnavailableException {
    BingMapResult result = geoLocationClient.method(HttpMethod.GET).uri(createUri(newAddress))
        .retrieve().bodyToMono(BingMapResult.class).block();
    checkResult(result);

    return transformResultToAddress(result, newAddress);
  }

  /**
   * Creates the uri.
   *
   * @param newAddress the new address
   * @return the uri
   */
  private URI createUri(AddressEntity newAddress) {
    return UriComponentsBuilder.fromUriString(config.getServiceUrl())
        .path(newAddress.getPostalCode()).path("/" + newAddress.getPlace())
        .path("/" + newAddress.getStreet() + " " + newAddress.getHouseNumber())
        .queryParam("key", config.getServiceSubscriptionKey()).build().encode().toUri();
  }

  /**
   * Check result.
   *
   * @param result the result
   * @throws ServiceUnavailableException the service unavailable exception
   */
  private void checkResult(BingMapResult result) throws ServiceUnavailableException {
    if (result.getStatusCode() != 200
        || !result.getAuthenticationResultCode().equals("ValidCredentials")) {
      throw new ServiceUnavailableException("External API is not available");
    }
  }

  /**
   * Transform result to address.
   *
   * @param result the result
   * @param givenAddress the given address
   * @return the address entity
   */
  private AddressEntity transformResultToAddress(BingMapResult result, AddressEntity givenAddress) {
    for (ResourceSet resourceSet : result.getResourceSets()) {
      if (resourceSet.getEstimatedTotal() > 0) {
        for (AddressResource resource : resourceSet.getResources()) {
          if (resource.getConfidence().equals("High") || resource.getConfidence().equals("high")) {
            return createAddress(givenAddress, resource.getAddress(), resource.getPoint());
          }
        }
      }
    }
    throw new NotFoundException("Address not found");
  }

  /**
   * Creates the address.
   *
   * @param givenAddress the given address
   * @param address the address
   * @param point the point
   * @return the address entity
   */
  private AddressEntity createAddress(AddressEntity givenAddress, Address address, Point point) {
    AddressEntity newAddress = new AddressEntity();

    newAddress.setPostalCode(address.getPostalCode());
    newAddress.setPlace(address.getLocality());
    newAddress.setHouseNumber(address.getHousenumber());
    newAddress.setStreet(address.getStreet());
    newAddress.setSuburb(givenAddress.getSuburb());
    newAddress.setLatitude(point.getLatitude());
    newAddress.setLongitude(point.getLongitude());

    return newAddress;
  }

}
