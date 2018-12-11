package de.codeschluss.portal.components.targetgroup;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class TargetGroupService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class TargetGroupService 
    extends ResourceDataService<TargetGroupEntity, TargetGroupQueryBuilder> {

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
      PagingAndSortingAssembler assembler,
      TargetGroupQueryBuilder queryBuilder) {
    super(repo, entities, assembler);
  }

  @Override
  public TargetGroupEntity getExisting(TargetGroupEntity newTargetGroup) {
    return repo.findOne(entities.withName(newTargetGroup.getName())).orElse(null);
  }

  /**
   * Gets the resource by activity.
   *
   * @param activityId the activity id
   * @return the resource by activity
   * @throws JsonParseException the json parse exception
   * @throws JsonMappingException the json mapping exception
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public Object getResourceByActivity(String activityId) 
       throws JsonParseException, JsonMappingException, IOException {
    List<TargetGroupEntity> targetGroups = repo.findAll(entities.withAnyActivityId(activityId));
    
    if (targetGroups == null || targetGroups.isEmpty()) {
      throw new NotFoundException(activityId);
    }
    
    return assembler.entitiesToResources(targetGroups, null);
  }

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
