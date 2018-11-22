package de.codeschluss.portal.components.suburb;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class SuburbService.
 */
@Service
public class SuburbService extends DataService<SuburbEntity, QSuburbEntity> {

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
      SuburbResourceAssembler assembler) {
    super(repo, assembler, QSuburbEntity.suburbEntity);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  public SuburbEntity getExisting(SuburbEntity suburb) {
    return repo.findOne(query.name.eq(suburb.getName())).orElse(null);
  }

  /**
   * Gets the resource by address.
   *
   * @param addressId
   *          the address id
   * @return the resource by address
   */
  public Resource<SuburbEntity> getResourceByAddress(String addressId) {
    SuburbEntity suburb = repo.findOne(query.addresses.any().id.eq(addressId))
        .orElseThrow(() -> new NotFoundException(addressId));
    return assembler.toResource(suburb);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#update(java.lang.String,
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

  @Override
  protected Predicate getFilteredPredicate(String filter) {
    filter = prepareFilter(filter);
    return query.name.likeIgnoreCase(filter);
  }
}
