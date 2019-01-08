package de.codeschluss.portal.components.images.organisation;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.image.ImageService;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

@Service
public class OrganisationImageService 
    extends ResourceDataService<OrganisationImageEntity, OrganisationImageQueryBuilder> {
  
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
  }
  
  @Override
  public OrganisationImageEntity getExisting(OrganisationImageEntity newEntity) {
    return repo.findOne(entities.withId(newEntity.getId())).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(OrganisationImageEntity newOrgaImage) {
    return validFields(newOrgaImage);
  }
  
  @Override
  public boolean validUpdateFieldConstraints(OrganisationImageEntity newOrgaImage) {
    return validFields(newOrgaImage);
  }

  /**
   * Valid fields.
   *
   * @param newOrgaImage the new orga image
   * @return true, if successful
   */
  private boolean validFields(OrganisationImageEntity newOrgaImage) {
    return newOrgaImage.getImageData() != null && !newOrgaImage.getImageData().isEmpty();
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
    
    return assembler.entitiesToResources(encodeImages(images), null);
  }
  
  /**
   * Encode images.
   *
   * @param images the images
   * @return the list
   */
  private List<OrganisationImageEntity> encodeImages(List<OrganisationImageEntity> images) {
    return images.stream().map(image -> {
      image.setImageData(Base64Utils.encodeToString(image.getImage()));
      return image;
    }).collect(Collectors.toList());
  }

  /**
   * Adds the resources.
   *
   * @param organisation the organisation
   * @param images the images
   * @return the resources
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public Resources<?> addResources(
      OrganisationEntity organisation,
      OrganisationImageEntity... images) throws IOException {
    List<Resource<?>> savedImages = new ArrayList<>();
    for (OrganisationImageEntity image : images) {
      savedImages.add(addResource(image, organisation));
    }
    return assembler.toListResources(savedImages, null);
  }

  /**
   * Adds the resource.
   *
   * @param image the input image
   * @param organisation the organisation
   * @return the resource
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public Resource<?> addResource(
      OrganisationImageEntity image, 
      OrganisationEntity organisation) throws IOException {
    if (image.getImageData() == null || image.getImageData().isEmpty()
        || image.getMimeType() == null || image.getMimeType().isEmpty()
        || !image.getMimeType().contains("/")) {
      throw new BadParamsException("Image or Mime Type with correct form required");
    }
    
    String formatType = extractFormatType(image.getMimeType());
    byte[] resizedImage = imageService.resize(
        Base64Utils.decodeFromString(image.getImageData()),
        formatType);
    
    image.setOrganisation(organisation);
    image.setImage(resizedImage);
    image.setImageData(Base64Utils.encodeToString(resizedImage));
    OrganisationImageEntity saved = repo.save(image);
    return assembler.toResource(saved);
  }

  private String extractFormatType(String mimeType) {
    String[] parts = mimeType.split("/");
    return parts[1];
  }
}
