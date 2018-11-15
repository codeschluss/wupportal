package de.codeschluss.portal.functional.tag;

import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;

@Service
public class TagService extends DataService<TagEntity, TagRepository> {

	protected final String DEFAULT_SORT_PROP = "name";
	
	public TagService(TagRepository repo, 
			TagResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public TagEntity getExisting(TagEntity newTag) {
		return repo.findByName(newTag.getName()).orElse(null);
	}
	
	public Resources<?> getResourceByActivity(String activityId) {
		List<TagEntity> tags = repo.findByActivitiesId(activityId).orElseThrow(() -> new NotFoundException(activityId));
		return assembler.entitiesToResources(tags, null);
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
