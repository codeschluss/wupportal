package de.codeschluss.portal.functional.suburb;

import org.springframework.web.bind.annotation.RestController;

import de.codeschluss.portal.common.base.CrudController;

@RestController
public class SuburbController extends CrudController<SuburbEntity, SuburbService> {

	public SuburbController(SuburbService service) {
		super(service);
		// TODO Auto-generated constructor stub
	}

}
