package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.functional.organisation.OrganisationController;
import de.codeschluss.portal.functional.organisation.OrganisationService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerUpdateAddressForOrganisationTest {
	
	@Autowired
    private OrganisationController controller;
	
	@Autowired
    private OrganisationService service;
	
	@Test
	@WithUserDetails("super@user")
	public void updateAddressSuperUserOK() {
		String orgaId = "00000000-0000-0000-0008-300000000000";
		String addressId = "00000000-0000-0000-0006-100000000000";
		
		controller.updateAddressForOrganisation(orgaId, addressId);
		
		assertThat(service.getById(orgaId).getAddress().getId()).isEqualTo(addressId);
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void updateAddressOwnOrgaOK() {
		String orgaId = "00000000-0000-0000-0008-100000000000";
		String addressId = "00000000-0000-0000-0006-400000000000";
		
		controller.updateAddressForOrganisation(orgaId, addressId);
		
		assertThat(service.getById(orgaId).getAddress().getId()).isEqualTo(addressId);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void updateAddressSuperUserWrongOrgaDenied() {
		String orgaId = "00000000-0000-0000-0008-XX0000000000";
		String addressId = "00000000-0000-0000-0006-100000000000";
		
		controller.updateAddressForOrganisation(orgaId, addressId);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("admin@user")
	public void updateAddressOwnOrgaWrongAddressDenied() {
		String orgaId = "00000000-0000-0000-0008-100000000000";
		String addressId = "00000000-0000-0000-0006-XX0000000000";
		
		controller.updateAddressForOrganisation(orgaId, addressId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void updateAddressOtherOrgaDenied() {
		String orgaId = "00000000-0000-0000-0008-300000000000";
		String addressId = "00000000-0000-0000-0006-400000000000";
		
		controller.updateAddressForOrganisation(orgaId, addressId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void updateAddressNoUserDenied() {
		String orgaId = "00000000-0000-0000-0008-300000000000";
		String addressId = "00000000-0000-0000-0006-400000000000";
		
		controller.updateAddressForOrganisation(orgaId, addressId);
	}
	
}
