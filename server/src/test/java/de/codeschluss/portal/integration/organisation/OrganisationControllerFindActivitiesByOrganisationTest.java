package de.codeschluss.portal.integration.organisation;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.organisation.OrganisationController;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerFindActivitiesByOrganisationTest {
	
    @Autowired
    private OrganisationController controller;
	
	@Test
	public void findActivitiesByOrganisationOK() {
		Resources<?> result = (Resources<?>) controller.findActivitiesByOrganisation("00000000-0000-0000-0008-100000000000").getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test(expected = NotFoundException.class)
	public void findActivitiesByOrganisationNotFound() {
		Resources<?> result = (Resources<?>) controller.findActivitiesByOrganisation("00000000-0000-0000-0008-XX0000000000").getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
}
