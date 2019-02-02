package de.codeschluss.portal.components.address;

import de.codeschluss.portal.components.address.bingmaps.Address;
import de.codeschluss.portal.components.address.bingmaps.AddressResource;
import de.codeschluss.portal.components.address.bingmaps.BingMapResult;
import de.codeschluss.portal.components.address.bingmaps.Point;
import de.codeschluss.portal.components.address.bingmaps.ResourceSet;
import de.codeschluss.portal.components.suburb.SuburbEntity;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.net.URI;

import javax.naming.ServiceUnavailableException;

import org.springframework.hateoas.Resource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

// TODO: Auto-generated Javadoc
/**
 * The Class AddressService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class AddressService extends ResourceDataService<AddressEntity, AddressQueryBuilder> {

  /** The config. */
  private final AddressConfiguration config;
  
  /** The geo location client. */
  private final WebClient geoLocationClient;
  
  /**
   * Instantiates a new address service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public AddressService(
      AddressRepository repo, 
      AddressQueryBuilder entities,
      PagingAndSortingAssembler assembler,
      AddressConfiguration config) {
    super(repo, entities, assembler);
    this.config = config;
    this.geoLocationClient = WebClient.create();
  }

  @Override
  public AddressEntity getExisting(AddressEntity address) {
    return repo.findOne(entities.withAddress(address)).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(AddressEntity newAddress) {
    return validBaseFields(newAddress)
        && newAddress.getSuburbId() != null && !newAddress.getSuburbId().isEmpty();
  }
  
  @Override
  public boolean validUpdateFieldConstraints(AddressEntity newAddress) {
    return validBaseFields(newAddress);
  }

  /**
   * Valid base fields.
   *
   * @param newAddress the new address
   * @return true, if successful
   */
  private boolean validBaseFields(AddressEntity newAddress) {
    return newAddress.getPlace() != null && !newAddress.getPlace().isEmpty()
        && newAddress.getPostalCode() != null && !newAddress.getPostalCode().isEmpty()
        && newAddress.getStreet() != null && !newAddress.getStreet().isEmpty();
  }

  /**
   * Gets the resources with suburbs by organisation.
   *
   * @param orgaId
   *          the orga id
   * @return the resources with suburbs by organisation
   */
  public Resource<?> getResourcesByOrganisation(String orgaId) {
    AddressEntity address = repo.findOne(entities.withAnyOrganisationId(orgaId))
        .orElseThrow(() -> new NotFoundException(orgaId));
    return assembler.toResource(address);
  }

  /**
   * Gets the resources with suburbs by activity.
   *
   * @param activityId
   *          the activity id
   * @return the resources with suburbs by activity
   */
  public Resource<?> getResourcesByActivity(String activityId) {
    AddressEntity address = repo.findOne(entities.withAnyActivityId(activityId))
        .orElseThrow(() -> new NotFoundException(activityId));
    return assembler.toResource(address);
  }

  @Override
  public AddressEntity update(String id, AddressEntity newAddress) {
    return repo.findById(id).map(address -> {
      address.setHouseNumber(newAddress.getHouseNumber());
      address.setLatitude(newAddress.getLatitude());
      address.setLongitude(newAddress.getLongitude());
      address.setPlace(newAddress.getPlace());
      address.setPostalCode(newAddress.getPostalCode());
      address.setStreet(newAddress.getStreet());
      return repo.save(address);
    }).orElseGet(() -> {
      newAddress.setId(id);
      return repo.save(newAddress);
    });
  }

  /**
   * < Update suburb.
   *
   * @param addressId
   *          the address id
   * @param suburb
   *          the suburb
   * @return the address entity
   */
  public AddressEntity updateSuburb(String addressId, SuburbEntity suburb) {
    AddressEntity address = repo.findById(addressId)
        .orElseThrow(() -> new NotFoundException(addressId));
    address.setSuburb(suburb);
    return repo.save(address);
  }
  
  @Override
  public AddressEntity add(AddressEntity newAddress) throws ServiceUnavailableException {
    AddressEntity existing = getExisting(newAddress);
    if (existing != null) {
      return existing;
    }
    
    newAddress = retrieveExternalAddress(newAddress);
    
    existing = getExisting(newAddress);
    if (existing != null) {
      return existing;
    }
    
    return repo.save(newAddress);
  }

  private AddressEntity retrieveExternalAddress(AddressEntity newAddress) 
      throws ServiceUnavailableException {
    BingMapResult result = geoLocationClient.method(HttpMethod.GET).uri(createUri(newAddress))
        .retrieve()
        .bodyToMono(BingMapResult.class)
        .block();
    checkResult(result);
    
    return transformResultToAddress(result, newAddress);
  }
  
  private URI createUri(AddressEntity newAddress) {
    return UriComponentsBuilder.fromUriString(config.getServiceUrl())
        .path(newAddress.getPostalCode())
        .path("/" + newAddress.getPlace())
        .path("/" + newAddress.getStreet() + " " + newAddress.getHouseNumber())
        .queryParam("key", config.getServiceSubscriptionKey())
        .build().encode().toUri();
  }
  
  private void checkResult(BingMapResult result) throws ServiceUnavailableException {
    if (result.getStatusCode() != 200 
        || !result.getAuthenticationResultCode().equals("ValidCredentials")) {
      throw new ServiceUnavailableException("External API is not available");
    }
  }
  
  private AddressEntity transformResultToAddress(BingMapResult result, AddressEntity givenAddress) {
    for (ResourceSet resourceSet : result.getResourceSets()) {
      if (resourceSet.getEstimatedTotal() > 0) {
        for (AddressResource resource : resourceSet.getResources()) {
          if (resource.getConfidence().equals("High") || resource.getConfidence().equals("high")) {
            return createAddress(
                givenAddress,
                resource.getAddress(), 
                resource.getPoint());
          }
        }
      }
    }
    throw new NotFoundException("Address not found");
  }
  
  private AddressEntity createAddress(
      AddressEntity givenAddress,
      Address address, 
      Point point) {
    AddressEntity newAddress = new AddressEntity();
    
    newAddress.setPostalCode(address.getPostalCode());
    newAddress.setPlace(address.getLocality());
    newAddress.setSuburb(givenAddress.getSuburb());
    newAddress.setStreet(address.getStreet());
    newAddress.setHouseNumber(address.getHousenumber());
    newAddress.setLatitude(point.getLatitude());
    newAddress.setLongitude(point.getLongitude());
    
    return newAddress;
  }
}
