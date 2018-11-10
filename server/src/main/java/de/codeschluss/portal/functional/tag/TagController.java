package de.codeschluss.portal.functional.tag;

import de.codeschluss.portal.common.base.CrudController;

public class TagController extends CrudController<TagEntity, TagService> {

	public TagController(TagService service) {
		super(service);
	}

}
