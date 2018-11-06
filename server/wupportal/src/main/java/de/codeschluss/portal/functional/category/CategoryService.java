package de.codeschluss.portal.functional.category;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class CategoryService extends DataService<CategoryEntity>{

	public CategoryService(CategoryRepository repo,
			 CategoryResourceAssembler assembler) {
		super(repo, assembler);
	}

}
