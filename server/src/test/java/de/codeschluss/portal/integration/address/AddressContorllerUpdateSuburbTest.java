package de.codeschluss.portal.integration.address;

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
import de.codeschluss.portal.functional.address.AddressController;
import de.codeschluss.portal.functional.address.AddressService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AddressContorllerUpdateSuburbTest {
	
	@Autowired
	private AddressController controller;
	
	@Autowired
	private AddressService service;
	
	@Test
	@WithUserDetails("super@user")
	public void updateSuburbSuperUserOK() {
		String addressId = "00000000-0000-0000-0006-100000000000";
		String suburbId = "00000000-0000-0000-0005-200000000000";
		
		controller.updateSuburb(addressId, suburbId);
		
		assertThat(service.getById(addressId).getSuburb().getId()).isEqualTo(suburbId);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void updateSuburbSuperUserWrongAddressDenied() {
		String addressId = "00000000-0000-0000-0006-XX0000000000";
		String suburbId = "00000000-0000-0000-0005-200000000000";
		
		controller.updateSuburb(addressId, suburbId);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void updateSuburbSuperUserWrongSuburbDenied() {
		String addressId = "00000000-0000-0000-0006-100000000000";
		String suburbId = "00000000-0000-0000-0005-XX0000000000";
		
		controller.updateSuburb(addressId, suburbId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void updateSuburbProviderUserDenied() {
		String addressId = "00000000-0000-0000-0006-200000000000";
		String suburbId = "00000000-0000-0000-0005-300000000000";
		
		controller.updateSuburb(addressId, suburbId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void updateSuburbNoUserDenied() {
		String addressId = "00000000-0000-0000-0006-200000000000";
		String suburbId = "00000000-0000-0000-0005-300000000000";
		
		controller.updateSuburb(addressId, suburbId);
	}

}
