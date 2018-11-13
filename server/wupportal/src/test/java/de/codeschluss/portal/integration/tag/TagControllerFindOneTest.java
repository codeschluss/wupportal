package de.codeschluss.portal.integration.tag;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.tag.TagController;
import de.codeschluss.portal.functional.tag.TagEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TagControllerFindOneTest {

	@Autowired
	private TagController controller;
	
	@Test
	public void findOneOK() {
		String tagId = "00000000-0000-0000-0002-100000000000";
		
		Resource<TagEntity> result = (Resource<TagEntity>) controller.findOne(tagId);
		
		assertThat(result.getContent()).isNotNull();
	}
	
	@Test(expected = NotFoundException.class)
	public void findTagNotFound() {
		String tagId = "00000000-0000-0000-0002-XX0000000000";
		
		controller.findOne(tagId);
	}
}
