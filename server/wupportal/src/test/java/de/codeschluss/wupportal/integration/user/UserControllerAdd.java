package de.codeschluss.wupportal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import de.codeschluss.wupportal.user.UserController;
import de.codeschluss.wupportal.user.UserEntity;
import de.codeschluss.wupportal.user.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerAdd {
	
	@Autowired
    private UserController controller;
	
	@Autowired
    private UserService service;
	
	@Test
	public void addWithoutSecurityOK() throws URISyntaxException {
		UserEntity user = new UserEntity("addWithoutSecurityOK", "test", "12345678", true, "addWithoutSecurityOK", null);
		
		controller.add(user);
		
		assertThat(service.getUser(user.getUsername()).getUsername()).isEqualTo(user.getUsername());
	}
	

	public void addWithoutSecurityDuplicated() throws URISyntaxException {
		UserEntity user = new UserEntity("provider1@user", "test", "12345678", true, "addWithoutSecurityDuplicated", null);
		
		ResponseEntity<String> response = (ResponseEntity<String>) controller.add(user);
		
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
	}

}
