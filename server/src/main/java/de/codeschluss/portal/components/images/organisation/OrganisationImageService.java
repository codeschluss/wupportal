package de.codeschluss.portal.components.images.organisation;

import de.codeschluss.portal.core.common.ResourceDataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

@Service
public class OrganisationImageService 
    extends ResourceDataService<OrganisationImageEntity, OrganisationImageQueryBuilder> {

  public OrganisationImageService(
      OrganisationImageRepository repo, 
      OrganisationImageQueryBuilder entities,
      OrganisationImageResourceAssembler assembler) {
    super(repo, entities, assembler);
  }
  
  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common
   * .DataService#getExisting(de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public OrganisationImageEntity getExisting(OrganisationImageEntity newEntity) {
    return repo.findOne(entities.withId(newEntity.getId())).orElse(null);
  }

  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common
   * .DataService#update(java.lang.String, de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public OrganisationImageEntity update(String id, OrganisationImageEntity updatedEntity) {
    return repo.findById(id).map(image -> {
      image.setCaption(updatedEntity.getCaption());
      image.setImage(updatedEntity.getImage());
      return repo.save(image);
    }).orElseGet(() -> {
      updatedEntity.setId(id);
      return repo.save(updatedEntity);
    });
  }

  /**
   * Gets the resources by organisation.
   *
   * @param organisationId the organisation id
   * @return the resources by organisation
   */
  public Resources<?> getResourcesByOrganisation(String organisationId) {
    List<OrganisationImageEntity> images = repo.findAll(
        entities.forOrganisationId(organisationId));
    if (images == null || images.isEmpty()) {
      throw new NotFoundException(organisationId);
    }
    
    return assembler.entitiesToResources(images, null);
  }
}
