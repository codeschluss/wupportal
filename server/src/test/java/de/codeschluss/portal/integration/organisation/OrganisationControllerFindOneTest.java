package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.organisation.OrganisationController;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerFindOneTest {
	
    @Autowired
    private OrganisationController controller;
    
	@Test
	public void findOneOK() {
		String otherOrganisationId = "00000000-0000-0000-0008-100000000000";
		
		Resource<OrganisationEntity> result = (Resource<OrganisationEntity>) controller.findOne(otherOrganisationId);
		
		assertThat(result.getContent().getId()).isEqualTo(otherOrganisationId);
	}
	
	@Test(expected = NotFoundException.class)
	public void findOneNotFound() {
		String otherOrganisationId = "00000000-0000-0000-0008-XX0000000000";
		
		controller.findOne(otherOrganisationId);
	}

}
