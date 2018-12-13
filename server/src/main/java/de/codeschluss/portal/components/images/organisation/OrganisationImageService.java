package de.codeschluss.portal.components.images.organisation;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.image.ImageService;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.io.IOException;
import java.util.List;

import org.apache.tika.Tika;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class OrganisationImageService 
    extends ResourceDataService<OrganisationImageEntity, OrganisationImageQueryBuilder> {
  
  private final Tika contentDetector;
  private final ImageService imageService;

  /**
   * Instantiates a new organisation image service.
   *
   * @param repo the repo
   * @param entities the entities
   * @param assembler the assembler
   * @param imageService the image service
   */
  public OrganisationImageService(
      OrganisationImageRepository repo, 
      OrganisationImageQueryBuilder entities,
      PagingAndSortingAssembler assembler,
      ImageService imageService) {
    super(repo, entities, assembler);
    this.imageService = imageService;
    this.contentDetector = new Tika();
  }
  
  @Override
  public OrganisationImageEntity getExisting(OrganisationImageEntity newEntity) {
    return repo.findOne(entities.withId(newEntity.getId())).orElse(null);
  }
  
  @Override
  public boolean validFieldConstraints(OrganisationImageEntity newOrgaImage) {
    return newOrgaImage.getImage() != null && newOrgaImage.getImage().length > 0;
  }

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
   * @throws JsonParseException the json parse exception
   * @throws JsonMappingException the json mapping exception
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public Resources<?> getResourcesByOrganisation(String organisationId) 
       throws JsonParseException, JsonMappingException, IOException {
    List<OrganisationImageEntity> images = repo.findAll(
        entities.forOrganisationId(organisationId));
    if (images == null || images.isEmpty()) {
      throw new NotFoundException(organisationId);
    }
    
    return assembler.entitiesToResources(images, null);
  }

  /**
   * Adds the resource.
   *
   * @param imageFile the image file
   * @param caption the caption
   * @param organisation the organisation
   * @return the resource
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public Resource<?> addResource(
      MultipartFile imageFile, 
      String caption, 
      OrganisationEntity organisation) throws IOException {
    String mimeType = contentDetector.detect(imageFile.getBytes());
    byte[] image = imageService.resize(imageFile);
    OrganisationImageEntity saved = repo.save(new OrganisationImageEntity(
        caption, image, mimeType, organisation));
    return assembler.toResource(saved);
  }
}
