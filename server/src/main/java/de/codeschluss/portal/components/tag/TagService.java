package de.codeschluss.portal.components.tag;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class TagService.
 */
@Service
public class TagService extends DataService<TagEntity> {

  /** The default sort prop. */
  protected final String defaultSortProp = "name";
  
  private TagQueryBuilder queryBuilder;

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
      TagQueryBuilder queryBuilder) {
    super(repo, assembler);
    this.queryBuilder = queryBuilder;
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  @Override
  public TagEntity getExisting(TagEntity newTag) {
    return repo.findOne(queryBuilder.isName(newTag.getName())).orElse(null);
  }

  /**
   * Gets the resource by activity.
   *
   * @param activityId
   *          the activity id
   * @return the resource by activity
   */
  public Resources<?> getResourcesByActivity(String activityId) {
    List<TagEntity> tags = repo.findAll(queryBuilder.anyActivityId(activityId));
    
    if (tags == null || tags.isEmpty()) {
      throw new NotFoundException(activityId);
    }
    return assembler.entitiesToResources(tags, null);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#update(java.lang.String,
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

  @Override
  protected Predicate getFilteredPredicate(String filter) {
    filter = prepareFilter(filter);
    return queryBuilder.fuzzySearchQuery(filter);
  }

}
