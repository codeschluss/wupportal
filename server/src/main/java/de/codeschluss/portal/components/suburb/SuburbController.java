package de.codeschluss.portal.components.suburb;

import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;

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

/**
 * The Class SuburbController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class SuburbController extends CrudController<SuburbEntity, SuburbService> {

  public SuburbController(SuburbService service) {
    super(service);
  }

  @Override
  @GetMapping("/suburbs")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/suburbs/{surburbId}")
  public Resource<SuburbEntity> readOne(@PathVariable String surburbId) {
    return super.readOne(surburbId);
  }

  @Override
  @PostMapping("/suburbs")
  @SuperUserPermission
  public ResponseEntity<?> create(@RequestBody SuburbEntity newSuburb) throws URISyntaxException {
    return super.create(newSuburb);
  }

  @Override
  @PutMapping("/suburbs/{surburbId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody SuburbEntity newSuburb,
      @PathVariable String surburbId) throws URISyntaxException {
    return super.update(newSuburb, surburbId);
  }

  @Override
  @DeleteMapping("/suburbs/{surburbId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String surburbId) {
    return super.delete(surburbId);
  }
}
