package de.codeschluss.portal.functional.category;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.functional.category.CategoryEntity;

@Service
public class CategoryService extends DataService<CategoryEntity, CategoryRepository>{

	public CategoryService(CategoryRepository repo,
			 CategoryResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	public CategoryEntity getDuplicate(CategoryEntity newCategory) {
		return repo.findByName(newCategory.getName()).orElse(null);
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
