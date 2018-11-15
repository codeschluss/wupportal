package de.codeschluss.portal.integration.targetgroup;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.DuplicateEntryException;
import de.codeschluss.portal.functional.targetgroup.TargetGroupController;
import de.codeschluss.portal.functional.targetgroup.TargetGroupEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TargetGroupControllerUpdateTest {
	
	@Autowired
	private TargetGroupController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void updateSuperUserOK() throws URISyntaxException {
		TargetGroupEntity targetGroup = new TargetGroupEntity("updateSuperUserOK", "updateSuperUserOK", null);	
		String targetGroupId = "00000000-0000-0000-0003-800000000000";
		
		controller.update(targetGroup, targetGroupId);
		
		Resource<TargetGroupEntity> result = (Resource<TargetGroupEntity>) controller.findOne(targetGroupId);
		assertThat(result.getContent().getName()).isEqualTo(targetGroup.getName());
	}
	
	@Test(expected = DuplicateEntryException.class)
	@WithUserDetails("super@user")
	public void updateSuperUserDuplicatedName() throws URISyntaxException {
		TargetGroupEntity targetGroup = new TargetGroupEntity("target1", "target1", null);	
		String targetGroupId = "00000000-0000-0000-0003-800000000000";
		
		controller.update(targetGroup, targetGroupId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void updateProviderUserDenied() throws URISyntaxException {
		TargetGroupEntity targetGroup = new TargetGroupEntity("updateProviderUserDenied", "updateProviderUserDenied", null);		
		String targetGroupId = "00000000-0000-0000-0003-100000000000";
		
		controller.update(targetGroup, targetGroupId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void updateNoUserDenied() throws URISyntaxException {
		TargetGroupEntity targetGroup = new TargetGroupEntity("updateNoUserDenied", "updateNoUserDenied", null);			
		String targetGroupId = "00000000-0000-0000-0003-100000000000";
		
		controller.update(targetGroup, targetGroupId);
	}

}
