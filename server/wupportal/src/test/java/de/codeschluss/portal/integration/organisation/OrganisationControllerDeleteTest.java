package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.organisation.OrganisationController;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class OrganisationControllerDeleteTest {
	
	@Autowired
    private OrganisationController controller;
	
	@Test(expected = NotFoundException.class)
	@WithUserDetails("super@user")
	public void deleteOtherSuperOrganisationOK() throws URISyntaxException {
		String organisationId = "00000000-0000-0000-0008-400000000000"; 
		assertThat(controller.findOne(organisationId)).isNotNull();
		
		controller.delete(organisationId);
		
		controller.findOne(organisationId);
	}
		
	@Test(expected = NotFoundException.class)
	@WithUserDetails("admin@user")
	public void deleteOwnOrganisationOK() throws URISyntaxException {
		String organisationId = "00000000-0000-0000-0008-500000000000"; 
		assertThat(controller.findOne(organisationId)).isNotNull();
		
		controller.delete(organisationId);
		
		controller.findOne(organisationId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void deleteOtherOrganisationDenied() throws URISyntaxException {
		String organisationId = "00000000-0000-0000-0008-100000000000"; 
		
		controller.delete(organisationId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void deleteOtherNotRegisteredDenied() {
		String otherOrganisationId = "00000000-0000-0000-0008-100000000000";
		
		controller.delete(otherOrganisationId);
	}


}
