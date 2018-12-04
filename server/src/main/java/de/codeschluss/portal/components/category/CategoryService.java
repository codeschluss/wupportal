package de.codeschluss.portal.components.category;

import de.codeschluss.portal.core.common.ResourceDataService;
import de.codeschluss.portal.core.exception.NotFoundException;

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

  /** The default sort prop. */
  protected final String defaultSortProp = "color";

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
      CategoryResourceAssembler assembler,
      CategoryQueryBuilder entities) {
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
  public CategoryEntity getExisting(CategoryEntity newCategory) {
    return repo.findOne(entities.withName(newCategory.getName())).orElse(null);
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

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.ResourceDataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
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
