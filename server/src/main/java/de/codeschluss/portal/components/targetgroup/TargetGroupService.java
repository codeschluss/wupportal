package de.codeschluss.portal.components.targetgroup;

import de.codeschluss.portal.core.common.ResourceDataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.util.List;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class TargetGroupService.
 */
@Service
public class TargetGroupService 
    extends ResourceDataService<TargetGroupEntity, TargetGroupQueryBuilder> {

  /** The default sort prop. */
  protected final String defaultSortProp = "name";

  /**
   * Instantiates a new target group service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public TargetGroupService(
      TargetGroupRepository repo, 
      TargetGroupQueryBuilder entities,
      TargetGroupResourceAssembler assembler,
      TargetGroupQueryBuilder queryBuilder) {
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
  public TargetGroupEntity getExisting(TargetGroupEntity newTargetGroup) {
    return repo.findOne(entities.withName(newTargetGroup.getName())).orElse(null);
  }

  /**
   * Gets the resource by activity.
   *
   * @param activityId
   *          the activity id
   * @return the resource by activity
   */
  public Object getResourceByActivity(String activityId) {
    List<TargetGroupEntity> targetGroups = repo.findAll(entities.withAnyActivityId(activityId));
    
    if (targetGroups == null || targetGroups.isEmpty()) {
      throw new NotFoundException(activityId);
    }
    
    return assembler.entitiesToResources(targetGroups, null);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.ResourceDataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public TargetGroupEntity update(String id, TargetGroupEntity newTargetGroup) {
    return repo.findById(id).map(tag -> {
      tag.setName(newTargetGroup.getName());
      tag.setDescription(newTargetGroup.getDescription());
      return repo.save(tag);
    }).orElseGet(() -> {
      newTargetGroup.setId(id);
      return repo.save(newTargetGroup);
    });
  }
}
