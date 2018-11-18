package de.codeschluss.portal.functional.organisation;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.utils.ResourceWithEmbeddable;
import de.codeschluss.portal.functional.address.AddressEntity;
import de.codeschluss.portal.functional.address.AddressService;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * The Class OrganisationService.
 */
@Service
@Transactional
public class OrganisationService extends DataService<OrganisationEntity, OrganisationRepository> {

  /** The default sort prop. */
  protected final String defaultSortProp = "name";

  /**
   * Instantiates a new organisation service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   * @param addressService
   *          the address service
   */
  public OrganisationService(OrganisationRepository repo, OrganisationResourceAssembler assembler,
      AddressService addressService) {
    super(repo, assembler);
  }

  /**
   * Exists by name.
   *
   * @param name
   *          the name
   * @return true, if successful
   */
  public boolean existsByName(String name) {
    return repo.existsByName(name);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#existsById(java.lang.String)
   */
  @Override
  public boolean existsById(String organisationId) {
    return repo.existsById(organisationId);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  @Override
  public OrganisationEntity getExisting(OrganisationEntity orga) {
    return repo.findByName(orga.getName()).orElse(null);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public OrganisationEntity update(String id, OrganisationEntity newOrga) {
    return repo.findById(id).map(orga -> {
      orga.setDescription(newOrga.getDescription());
      orga.setImage(newOrga.getImage());
      orga.setMail(newOrga.getMail());
      orga.setName(newOrga.getName());
      orga.setPhone(newOrga.getPhone());
      orga.setWebsite(newOrga.getWebsite());
      return repo.save(orga);
    }).orElseGet(() -> {
      newOrga.setId(id);
      return repo.save(newOrga);
    });
  }

  /**
   * Update address.
   *
   * @param organisationId
   *          the organisation id
   * @param address
   *          the address
   * @return the organisation entity
   */
  public OrganisationEntity updateAddress(String organisationId, AddressEntity address) {
    OrganisationEntity orga = getById(organisationId);
    orga.setAddress(address);
    return repo.save(orga);
  }

  /**
   * Convert to resource.
   *
   * @param provider
   *          the provider
   * @return the resource
   */
  public Resource<OrganisationEntity> convertToResource(ProviderEntity provider) {
    return assembler.toResource(provider.getOrganisation());
  }

  /**
   * Convert to resources with providers.
   *
   * @param providers
   *          the providers
   * @return the resources
   */
  public Resources<?> convertToResourcesWithProviders(List<ProviderEntity> providers) {
    List<ResourceWithEmbeddable<OrganisationEntity>> result = providers.stream().map(provider -> {
      return assembler.toResourceWithEmbedabble(provider.getOrganisation(), provider, "provider");
    }).collect(Collectors.toList());

    return assembler.toListResources(result, null);
  }
}
