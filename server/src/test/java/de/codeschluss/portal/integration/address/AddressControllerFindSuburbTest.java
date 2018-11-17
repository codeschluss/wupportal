package de.codeschluss.portal.integration.address;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.address.AddressController;
import de.codeschluss.portal.functional.suburb.SuburbEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AddressControllerFindSuburbTest {

	@Autowired
	private AddressController controller;
	
	@Test
	@SuppressWarnings("unchecked")
	public void findSuburbOK() {
		String addressId = "00000000-0000-0000-0006-100000000000";
		
		Resource<SuburbEntity> result = (Resource<SuburbEntity>) controller.findSuburb(addressId).getBody();
		
		assertThat(result.getContent()).isNotNull();
	}
	
	@Test(expected = NotFoundException.class)
	public void findSuburbNotFound() {
		String addressId = "00000000-0000-0000-0006-XX0000000000";
		
		controller.findSuburb(addressId);
	}
}
