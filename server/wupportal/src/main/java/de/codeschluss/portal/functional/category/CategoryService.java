package de.codeschluss.portal.functional.category;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.category.CategoryEntity;

@Service
public class CategoryService extends DataService<CategoryEntity, CategoryRepository>{

	protected final String DEFAULT_SORT_PROP = "name";
	
	public CategoryService(CategoryRepository repo,
			 CategoryResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	public CategoryEntity getExisting(CategoryEntity newCategory) {
		return repo.findByName(newCategory.getName()).orElse(null);
	}
	
	public Resource<CategoryEntity> getResourceByActivity(String activityId) {
		CategoryEntity category = repo.findByActivitiesId(activityId).orElseThrow(() -> new NotFoundException(activityId));
		return assembler.toResource(category);
	}
	
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
