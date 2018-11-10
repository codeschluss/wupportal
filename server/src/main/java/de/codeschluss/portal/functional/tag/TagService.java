package de.codeschluss.portal.functional.tag;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;

@Service
public class TagService extends DataService<TagEntity, TagRepository> {

	public TagService(TagRepository repo, 
			TagResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public TagEntity getDuplicate(TagEntity newTag) {
		return repo.findByName(newTag.getName()).orElse(null);
	}
	
	public Resources<?> getResourceByActivity(String activityId, ResponseEntity<?> responseEntity) {
		List<TagEntity> tags = repo.findByActivitiesId(activityId).orElseThrow(() -> new NotFoundException(activityId));
		return assembler.entitiesToResources(tags, responseEntity);
	}

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
