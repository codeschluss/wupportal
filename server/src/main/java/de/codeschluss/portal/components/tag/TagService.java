package de.codeschluss.portal.components.tag;

import de.codeschluss.portal.core.common.ResourceDataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class TagService.
 */
@Service
public class TagService extends ResourceDataService<TagEntity, TagQueryBuilder> {

  /** The default sort prop. */
  protected final String defaultSortProp = "name";

  /**
   * Instantiates a new tag service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public TagService(
      TagRepository repo, 
      TagResourceAssembler assembler,
      TagQueryBuilder entities) {
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
  public TagEntity getExisting(TagEntity newTag) {
    return repo.findOne(entities.withName(newTag.getName())).orElse(null);
  }

  /**
   * Gets the resource by activity.
   *
   * @param activityId
   *          the activity id
   * @return the resource by activity
   */
  public Resources<?> getResourcesByActivity(String activityId) {
    List<TagEntity> tags = repo.findAll(entities.withAnyActivityId(activityId));
    
    if (tags == null || tags.isEmpty()) {
      throw new NotFoundException(activityId);
    }
    return assembler.entitiesToResources(tags, null);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.ResourceDataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public TagEntity update(String id, TagEntity newTag) {
    return repo.findById(id).map(tag -> {
      tag.setName(newTag.getName());
      tag.setDescription(newTag.getDescription());
      return repo.save(tag);
    }).orElseGet(() -> {
      newTag.setId(id);
      return repo.save(newTag);
    });
  }
}
