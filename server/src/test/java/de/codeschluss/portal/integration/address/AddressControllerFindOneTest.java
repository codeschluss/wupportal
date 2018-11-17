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
import de.codeschluss.portal.functional.address.AddressEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AddressControllerFindOneTest {
	
	@Autowired
	private AddressController controller;
	
	@Test
	public void findOneOK() {
		String addressId = "00000000-0000-0000-0006-100000000000";
		
		Resource<AddressEntity> result = (Resource<AddressEntity>) controller.findOne(addressId);
		
		assertThat(result.getContent().getId()).isEqualTo(addressId);
	}
	
	@Test(expected = NotFoundException.class)
	public void findOneNotFound() {
		String addressId = "00000000-0000-0000-0006-XX0000000000";
		
		controller.findOne(addressId);
	}

}
