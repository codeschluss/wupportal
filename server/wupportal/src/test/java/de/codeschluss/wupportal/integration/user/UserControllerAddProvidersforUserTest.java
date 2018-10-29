package de.codeschluss.wupportal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.wupportal.exception.BadParamsException;
import de.codeschluss.wupportal.provider.ProviderEntity;
import de.codeschluss.wupportal.provider.ProviderTO;
import de.codeschluss.wupportal.user.UserController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerAddProvidersforUserTest {

	@Autowired
    private UserController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void addSingleProviderForOtherUserSuperUserOK() {
		String userId = "00000000-0000-0000-0004-300000000000";
		String orgaId = "00000000-0000-0000-0008-200000000000";
		ProviderTO provider = new ProviderTO(null,orgaId);
		
		Resources<ProviderEntity> result = (Resources<ProviderEntity>) controller.addProvidersforUser(userId, provider).getBody();
		
		assertThat(result.getContent()).haveExactly(1, new Condition<>(
				p -> p.getOrganisation().getId().equals(orgaId), "new provider with given orga exists"));
	}
	
	@Test
	@WithUserDetails("provider1@user")
	public void addMultipleProviderForOwnUserOK() {
		String userId = "00000000-0000-0000-0004-300000000000";
		String orgaId1 = "00000000-0000-0000-0008-200000000000";
		String orgaId2 = "00000000-0000-0000-0008-300000000000";
		ProviderTO[] requestBody = new ProviderTO[2];
		requestBody[0] = new ProviderTO(null,orgaId1);
		requestBody[1] = new ProviderTO(null,orgaId2);
		
		Resources<ProviderEntity> result = (Resources<ProviderEntity>) controller.addProvidersforUser(userId, requestBody).getBody();
		
		assertThat(result.getContent()).haveExactly(1, new Condition<>(
				p -> p.getOrganisation().getId().equals(orgaId1), "new provider with given orga1 exists"));
		
		assertThat(result.getContent()).haveExactly(1, new Condition<>(
				p -> p.getOrganisation().getId().equals(orgaId2), "new provider with given orga2 exists"));
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void addProviderForOtherUserDenied() {
		String userId = "00000000-0000-0000-0004-400000000000";
		String orgaId = "00000000-0000-0000-0008-300000000000";
		ProviderTO provider = new ProviderTO(null,orgaId);
		
		controller.addProvidersforUser(userId, provider);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addProviderForOtherUserNotRegisteredDenied() {
		String userId = "00000000-0000-0000-0004-400000000000";
		String orgaId = "00000000-0000-0000-0008-300000000000";
		ProviderTO provider = new ProviderTO(null,orgaId);
		
		controller.addProvidersforUser(userId, provider);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void addProviderBadParamsNoUser() {
		String userId = "12345678-0000-0000-0004-XX0000000000";
		String orgaId = "00000000-0000-0000-0008-300000000000";
		ProviderTO provider = new ProviderTO(null,orgaId);
		
		controller.addProvidersforUser(userId, provider);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void addProviderBadParamsNoOrga() {
		String userId = "00000000-0000-0000-0004-400000000000";
		String orgaId = "12345678-0000-0000-0008-XX0000000000";
		ProviderTO provider = new ProviderTO(null,orgaId);
		
		controller.addProvidersforUser(userId, provider);
	}
}
