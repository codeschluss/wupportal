package de.codeschluss.portal.functional.category;

import de.codeschluss.portal.core.common.CrudController;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;
import de.codeschluss.portal.core.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.category.CategoryEntity;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController extends CrudController<CategoryEntity, CategoryService> {

  public CategoryController(CategoryService service) {
    super(service);
  }

  @Override
  @GetMapping("/categories")
  public ResponseEntity<?> findAll(FilterSortPaginate params) {
    return super.findAll(params);
  }

  @Override
  @GetMapping("/categories/{categoryId}")
  public Resource<CategoryEntity> findOne(@PathVariable String categoryId) {
    return super.findOne(categoryId);
  }

  @Override
  @PostMapping("/categories")
  @SuperUserPermission
  public ResponseEntity<?> add(@RequestBody CategoryEntity newCategory) throws URISyntaxException {
    return super.add(newCategory);
  }

  @Override
  @PutMapping("/categories/{categoryId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody CategoryEntity newCategory,
      @PathVariable String categoryId) throws URISyntaxException {
    return super.update(newCategory, categoryId);
  }

  @Override
  @DeleteMapping("/categories/{categoryId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String categoryId) {
    return super.delete(categoryId);
  }
}
