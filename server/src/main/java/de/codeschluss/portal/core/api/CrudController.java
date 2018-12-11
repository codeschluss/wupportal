package de.codeschluss.portal.core.api;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.api.dto.SortPaginate;
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

// TODO: Auto-generated Javadoc
/**
 * The Class CrudController.
 * 
 * @author Valmir Etemi
 *
 * @param <E>
 *          the element type
 * @param <S>
 *          the generic type
 * 
 */
public abstract class CrudController<E extends BaseResource, S extends ResourceDataService<E, ?>> {
  
  /** The service. */
  protected final S service;

  /**
   * Instantiates a new crud controller.
   *
   * @param service
   *          the service
   */
  public CrudController(S service) {
    this.service = service;
  }

  /**
   * Read all.
   *
   * @param params the params
   * @return the response entity
   */
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    validateRead(params);

    try {
      return params.getPage() == null && params.getSize() == null
          ? ok(service.getSortedListResources(params))
          : ok(service.getPagedResources(params));
    } catch (IOException e) {
      throw new BadParamsException(params.toString());
    }
  }
  
  /**
   * Validate request.
   *
   * @param params
   *          the params
   */
  protected void validateRead(SortPaginate params) {
    if (params != null && !isPaginationValid(params.getPage(), params.getSize())) {
      throw new BadParamsException("param size or page is null");
    }
  }

  /**
   * Checks if is pagination valid.
   *
   * @param page
   *          the page
   * @param size
   *          the size
   * @return true, if is pagination valid
   */
  protected boolean isPaginationValid(Integer page, Integer size) {
    return (page != null && size != null) || (page == null && size == null);
  }


  /**
   * Read one.
   *
   * @param id the id
   * @return the resource
   */
  public Resource<E> readOne(@PathVariable String id) {
    return service.getResourceById(id);
  }

  /**
   * Adds the.
   *
   * @param newEntity
   *          the new entity
   * @return the response entity
   * @throws URISyntaxException
   *           the URI syntax exception
   */
  public ResponseEntity<?> create(@RequestBody E newEntity) throws URISyntaxException {
    validateCreate(newEntity);
    
    Resource<E> resource = service.addResource(newEntity);
    return created(new URI(resource.getId().expand().getHref())).body(resource);
  }

  /**
   * Validate create.
   *
   * @param newEntity the new entity
   */
  protected void validateCreate(E newEntity) {
    if (service.getExisting(newEntity) != null) {
      throw new DuplicateEntryException("Entity already exists!");
    }
  }

  /**
   * Update.
   *
   * @param newEntity
   *          the new entity
   * @param id
   *          the id
   * @return the response entity
   * @throws URISyntaxException
   *           the URI syntax exception
   */
  public ResponseEntity<?> update(@RequestBody E newEntity, @PathVariable String id)
      throws URISyntaxException {
    E duplicate = service.getExisting(newEntity);
    if (duplicate != null && !duplicate.getId().equals(id)) {
      throw new DuplicateEntryException("Entity already exists!");
    }

    Resource<E> resource = service.updateResource(id, newEntity);
    return created(new URI(resource.getId().expand().getHref())).body(resource);
  }

  /**
   * Delete.
   *
   * @param id
   *          the id
   * @return the response entity
   */
  public ResponseEntity<?> delete(@PathVariable String id) {
    service.delete(id);
    return noContent().build();
  }
}
