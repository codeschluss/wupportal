package de.codeschluss.portal.integration.targetgroup;

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
import de.codeschluss.portal.functional.targetgroup.TargetGroupController;
import de.codeschluss.portal.functional.targetgroup.TargetGroupEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TargetGroupControllerAddTest {

	@Autowired
	private TargetGroupController controller;
	
	@Test
	@WithUserDetails("super@user")
	@SuppressWarnings("unchecked")
	public void addSuperUserOK() throws URISyntaxException {
		TargetGroupEntity targetGroup = new TargetGroupEntity("addSuperUserOK", "addSuperUserOK", null);		
		
		controller.add(targetGroup);
		
		Resources<Resource<TargetGroupEntity>> result = (Resources<Resource<TargetGroupEntity>>) controller.findAll(new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getContent().getName().equals(targetGroup.getName()),"targetGroup exists"));
	}
	
	@Test(expected = DuplicateEntryException.class)
	@WithUserDetails("super@user")
	public void addSuperUserDuplicated() throws URISyntaxException {
		TargetGroupEntity targetGroup = new TargetGroupEntity("target1", "target1", null);
		
		controller.add(targetGroup);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void addProviderDenied() throws URISyntaxException {
		TargetGroupEntity targetGroup = new TargetGroupEntity("addProviderDenied", "addProviderDenied", null);
		
		controller.add(targetGroup);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addNoUserDenied() throws URISyntaxException {
		TargetGroupEntity targetGroup = new TargetGroupEntity("addNoUserDenied", "addNoUserDenied", null);
		
		controller.add(targetGroup);
	}
}
