package de.codeschluss.portal.integration.address;

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
import de.codeschluss.portal.functional.address.AddressController;
import de.codeschluss.portal.functional.address.AddressEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AddressControllerAddTest {

	@Autowired
	private AddressController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void addSuperUserOK() throws URISyntaxException {
		AddressEntity address = new AddressEntity("1", "addSuperUserOK", "1111", "addSuperUserOK", null, 1, 1, null, null);		
		
		controller.add(address);
		
		assertContaining(address);
	}

	@Test
	@WithUserDetails("provider1@user")
	public void addProviderUserOK() throws URISyntaxException {
		AddressEntity address = new AddressEntity("1", "addProviderUserOK", "1111", "addProviderUserOK", null, 1, 1, null, null);		
		
		controller.add(address);
		
		assertContaining(address);
	}
	
	@Test(expected = DuplicateEntryException.class)
	@WithUserDetails("super@user")
	public void addSuperUserDuplicated() throws URISyntaxException {
		AddressEntity address = new AddressEntity("1", "wuppertal", "42103", "address1", null, 0, 0, null, null);
		
		controller.add(address);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("new@user")
	public void addNotApprovedProviderDenied() throws URISyntaxException {
		AddressEntity address = new AddressEntity("1", "addAdminNoProviderDenied", "1111", "addAdminNoProviderDenied", null, 1, 1, null, null);
		
		controller.add(address);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addNoUserDenied() throws URISyntaxException {
		AddressEntity address = new AddressEntity("1", "addNoUserDenied", "1111", "addNoUserDenied", null, 1, 1, null, null);
		
		controller.add(address);
	}
	
	@SuppressWarnings("unchecked")
	private void assertContaining(AddressEntity address) {
		Resources<Resource<AddressEntity>> result = (Resources<Resource<AddressEntity>>) controller.findAll(new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getContent().getStreet().equals(address.getStreet()),"address exists"));
	}
}
