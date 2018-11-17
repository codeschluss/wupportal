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

import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.functional.organisation.OrganisationController;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.organisation.OrganisationService;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class OrganisationControllerAddTest {
	
	@Autowired
    private OrganisationController controller;
	
	@Autowired
    private OrganisationService service;
	
	@Test
	@WithUserDetails("super@user")
	public void addSuperUserOK() throws URISyntaxException {
		OrganisationEntity organisation = new OrganisationEntity("addSuperUserOK", null, "add@SuperUserOK", "addSuperUserOK", "123456789", "addSuperUserOK", null, null);
		
		controller.add(organisation);
		
		assertThat(service.existsByName(organisation.getName())).isTrue();
	}
	
	@Test(expected = DuplicateEntryException.class)
	@WithUserDetails("super@user")
	public void addSuperUserDuplicated() throws URISyntaxException {
		OrganisationEntity organisation = new OrganisationEntity("organisation1", null, "organisation1", "organisation1", "123456789", "organisation1", null, null);
		
		controller.add(organisation);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void addProviderDenied() throws URISyntaxException {
		OrganisationEntity organisation = new OrganisationEntity("addProviderDenied", null, "addProviderDenied", "addProviderDenied", "123456789", "addProviderDenied", null, null);
		
		controller.add(organisation);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addNoUserDenied() throws URISyntaxException {
		OrganisationEntity organisation = new OrganisationEntity("addNoUserDenied", null, "addNoUserDenied", "addNoUserDenied", "123456789", "addNoUserDenied", null, null);
		
		controller.add(organisation);
	}

}
