package de.codeschluss.portal.integration.tag;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URISyntaxException;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.DuplicateEntryException;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.tag.TagController;
import de.codeschluss.portal.functional.tag.TagEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TagControllerAddTest {

	@Autowired
	private TagController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void addSuperUserOK() throws URISyntaxException {
		TagEntity tag = new TagEntity("addSuperUserOK", "addSuperUserOK", null);		
		
		controller.add(tag);
		
		assertContaining(tag);
	}

	@Test
	@WithUserDetails("provider1@user")
	public void addProviderUserOK() throws URISyntaxException {
		TagEntity tag = new TagEntity("addProviderUserOK", "addProviderUserOK", null);		
		
		controller.add(tag);
		
		assertContaining(tag);
	}
	
	@Test(expected = DuplicateEntryException.class)
	@WithUserDetails("super@user")
	public void addSuperUserDuplicated() throws URISyntaxException {
		TagEntity tag = new TagEntity("tag1", "tag1", null);
		
		controller.add(tag);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("new@user")
	public void addNotApprovedDenied() throws URISyntaxException {
		TagEntity tag = new TagEntity("addNotApprovedDenied", "addNotApprovedDenied", null);
		
		controller.add(tag);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addNoUserDenied() throws URISyntaxException {
		TagEntity tag = new TagEntity("addNoUserDenied", "addNoUserDenied", null);
		
		controller.add(tag);
	}
	
	@SuppressWarnings("unchecked")
	private void assertContaining(TagEntity tag) {
		Resources<Resource<TagEntity>> result = (Resources<Resource<TagEntity>>) controller.findAll(new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getContent().getName().equals(tag.getName()),"tag exists"));
	}
}
