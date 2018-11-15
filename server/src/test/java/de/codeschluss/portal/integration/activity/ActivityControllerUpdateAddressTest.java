package de.codeschluss.portal.integration.activity;

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

import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.address.AddressEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerUpdateAddressTest {
	
	@Autowired
	private ActivityController controller;	
	
	@Test
	@WithUserDetails("super@user")
	public void updateAddressSuperUserOK() throws URISyntaxException {
		String addressId = "00000000-0000-0000-0006-400000000000";
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		controller.updateAddress(activityId, addressId);
		
		assertContaining(activityId, addressId);
	}

	@Test
	@WithUserDetails("provider1@user")
	public void updateProviderOK() throws URISyntaxException {
		String addressId = "00000000-0000-0000-0006-200000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.updateAddress(activityId, addressId);
		
		assertContaining(activityId, addressId);
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void updateAdminOK() throws URISyntaxException {
		String addressId = "00000000-0000-0000-0006-300000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.updateAddress(activityId, addressId);
		
		assertContaining(activityId, addressId);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void updateSuperActivityBadParam() throws URISyntaxException {
		String addressId = "00000000-0000-0000-0006-300000000000";
		String activityId = "00000000-0000-0000-0010-XX0000000000";
		
		controller.updateAddress(activityId, addressId);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("provider1@user")
	public void updateProviderAddressBadParam() throws URISyntaxException {
		String addressId = "00000000-0000-0000-0006-XX0000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.updateAddress(activityId, addressId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void updateOtherProviderDenied() throws URISyntaxException {
		String addressId = "00000000-0000-0000-0006-300000000000";
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.updateAddress(activityId, addressId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void updateNoUserDenied() throws URISyntaxException {
		String addressId = "00000000-0000-0000-0006-300000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.updateAddress(activityId, addressId);
	}
	
	private void assertContaining(String activityId, String addressId) {
		Resource<AddressEntity> result = (Resource<AddressEntity>) controller.findAddress(activityId).getBody();
		assertThat(result.getContent().getId()).isEqualTo(addressId);
	}
}
