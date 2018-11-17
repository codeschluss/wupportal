package de.codeschluss.portal.integration.address;

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

import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.functional.address.AddressController;
import de.codeschluss.portal.functional.address.AddressEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AddressControllerUpdateTest {
	
	@Autowired
	private AddressController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void updateSuperUserOK() throws URISyntaxException {
		AddressEntity address = new AddressEntity("2", "wuppertal", "42103", "changed", null, 0, 0, null, null);		
		String addressId = "00000000-0000-0000-0006-200000000000";
		
		controller.update(address, addressId);
		
		Resource<AddressEntity> result = (Resource<AddressEntity>) controller.findOne(addressId);
		assertThat(result.getContent().getStreet()).isEqualTo(address.getStreet());
	}
	
	@Test(expected = DuplicateEntryException.class)
	@WithUserDetails("super@user")
	public void updateSuperUserDuplicated() throws URISyntaxException {
		AddressEntity address = new AddressEntity("1", "wuppertal", "42103", "address1", null, 0, 0, null, null);
		String addressId = "00000000-0000-0000-0006-200000000000";
		
		controller.update(address, addressId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void updateProviderUserDenied() throws URISyntaxException {
		AddressEntity address = new AddressEntity("2", "wuppertal", "42103", "changed", null, 0, 0, null, null);
		String addressId = "00000000-0000-0000-0006-100000000000";
		
		controller.update(address, addressId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void updateNoUserDenied() throws URISyntaxException {
		AddressEntity address = new AddressEntity("2", "wuppertal", "42103", "changed", null, 0, 0, null, null);
		String addressId = "00000000-0000-0000-0006-100000000000";
		
		controller.update(address, addressId);
	}

}
