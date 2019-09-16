package de.codeschluss.portal.components.category;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.service.ResourceDataService;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class CategoryService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class CategoryService extends ResourceDataService<CategoryEntity, CategoryQueryBuilder> {
  
  /**
   * Instantiates a new category service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public CategoryService(
      CategoryRepository repo, 
      PagingAndSortingAssembler assembler,
      CategoryQueryBuilder entities) {
    super(repo, entities, assembler);
  }

  @Override
  public CategoryEntity getExisting(CategoryEntity newCategory) {
    return repo.findOne(entities.withName(newCategory.getName())).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(CategoryEntity newCategory) {
    return validFields(newCategory);
  }

  @Override
  public boolean validUpdateFieldConstraints(CategoryEntity newCategory) {
    return validFields(newCategory);
  }
  
  /**
   * Valid fields.
   *
   * @param newCategory the new category
   * @return true, if successful
   */
  private boolean validFields(CategoryEntity newCategory) {
    return newCategory.getName() != null && !newCategory.getName().isEmpty()
        && newCategory.getColor() != null && !newCategory.getColor().isEmpty();
  }

  /**
   * Gets the resource by activity.
   *
   * @param activityId
   *          the activity id
   * @return the resource by activity
   */
  public Resource<CategoryEntity> getResourceByActivity(String activityId) {
    CategoryEntity category = repo.findOne(entities.withAnyActivityId(activityId))
        .orElseThrow(() -> new NotFoundException(activityId));
    return assembler.toResource(category);
  }

  @Override
  public CategoryEntity update(String id, CategoryEntity newCategory) {
    return repo.findById(id).map(category -> {
      category.setName(newCategory.getName());
      category.setDescription(newCategory.getDescription());
      category.setColor(newCategory.getColor());
      return repo.save(category);
    }).orElseGet(() -> {
      newCategory.setId(id);
      return repo.save(newCategory);
    });
  }
}
