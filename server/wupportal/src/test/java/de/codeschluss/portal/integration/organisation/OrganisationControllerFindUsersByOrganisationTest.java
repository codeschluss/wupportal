package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.organisation.OrganisationController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerFindUsersByOrganisationTest {
	
	@Autowired
	private OrganisationController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void findUsersSuperUserOK() {
		Resources<?> result = (Resources<?>) controller.findUsersByOrganisation("00000000-0000-0000-0008-100000000000").getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void findUsersAdminUserOK() {
		Resources<?> result = (Resources<?>) controller.findUsersByOrganisation("00000000-0000-0000-0008-100000000000").getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test(expected = NotFoundException.class)
	@WithUserDetails("super@user")
	public void findUsersNotFound() {
		controller.findUsersByOrganisation("00000000-0000-0000-0008-XX0000000000");
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void findUsersProviderUserDenied() {
		controller.findUsersByOrganisation("00000000-0000-0000-0008-100000000000");
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void findUsersNoUserDenied() {
		controller.findUsersByOrganisation("00000000-0000-0000-0008-100000000000");
	}
}
