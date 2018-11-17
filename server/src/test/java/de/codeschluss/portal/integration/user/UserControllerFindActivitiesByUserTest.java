package de.codeschluss.portal.integration.user;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.user.UserController;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerFindActivitiesByUserTest {
	
    @Autowired
    private UserController controller;
	
	@Test
	public void findActivitiesByUserOK() {
		
		Resources<?> result = (Resources<?>) controller.findActivities("00000000-0000-0000-0004-300000000000").getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test(expected = NotFoundException.class)
	public void findActivitiesByUserNotFound() {
		
		Resources<?> result = (Resources<?>) controller.findActivities("00000000-0000-0000-0004-XX0000000000").getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
}
