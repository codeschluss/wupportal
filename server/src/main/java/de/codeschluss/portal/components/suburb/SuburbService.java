package de.codeschluss.portal.components.suburb;

import de.codeschluss.portal.core.common.ResourceDataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class SuburbService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class SuburbService extends ResourceDataService<SuburbEntity, SuburbQueryBuilder> {

  /**
   * Instantiates a new suburb service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public SuburbService(
      SuburbRepository repo, 
      SuburbQueryBuilder entities,
      SuburbResourceAssembler assembler) {
    super(repo, entities, assembler);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.ResourceDataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  @Override
  public SuburbEntity getExisting(SuburbEntity suburb) {
    return repo.findOne(entities.withName(suburb.getName())).orElse(null);
  }

  /**
   * Gets the resource by address.
   *
   * @param addressId
   *          the address id
   * @return the resource by address
   */
  public Resource<SuburbEntity> getResourceByAddress(String addressId) {
    SuburbEntity suburb = repo.findOne(entities.withAnyAddressId(addressId))
        .orElseThrow(() -> new NotFoundException(addressId));
    return assembler.toResource(suburb);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.ResourceDataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public SuburbEntity update(String id, SuburbEntity newSuburb) {
    return repo.findById(id).map(suburb -> {
      suburb.setName(newSuburb.getName());
      return repo.save(suburb);
    }).orElseGet(() -> {
      newSuburb.setId(id);
      return repo.save(newSuburb);
    });
  }
}