package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.functional.organisation.OrganisationController;
import de.codeschluss.portal.functional.provider.ProviderService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerApproveOrRejectUserForOrganisationTest {

    @Autowired
    private OrganisationController controller;
    
    @Autowired
    private ProviderService providerService;
    
    
	@Test
	@WithUserDetails("super@user")
	public void ApproveSuperUserOK() {
		String organisationId = "00000000-0000-0000-0008-200000000000";
		String userId = "00000000-0000-0000-0004-800000000000";
		assertThat(providerService.getProviderByUserAndOrganisation(userId, organisationId).isApproved()).isFalse();
		
		ResponseEntity<?> result = (ResponseEntity<?>) controller.approveOrRejectUserForOrganisation(organisationId, userId, true);
		
		assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
		assertThat(providerService.getProviderByUserAndOrganisation(userId, organisationId).isApproved()).isTrue();
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void RejectOwnAdminOK() {
		String organisationId = "00000000-0000-0000-0008-100000000000";
		String userId = "00000000-0000-0000-0004-400000000000";
		assertThat(providerService.getProviderByUserAndOrganisation(userId, organisationId).isApproved()).isTrue();
		
		ResponseEntity<?> result = (ResponseEntity<?>) controller.approveOrRejectUserForOrganisation(organisationId, userId, false);
		
		assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
		assertThat(providerService.getProviderByUserAndOrganisation(userId, organisationId).isApproved()).isFalse();
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void RejectSupeUserBadRequest() {
		String notExistingOrganisationId = "12345678-0000-0000-0004-XX0000000000";
		String userId = "00000000-0000-0000-0004-400000000000";
		
		controller.approveOrRejectUserForOrganisation(notExistingOrganisationId, userId, false);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("new@user")
	public void ApproveProviderUserDenied() {
		String orgaId = "00000000-0000-0000-0004-300000000000";
		String userId = "00000000-0000-0000-0004-500000000000";
		
		controller.approveOrRejectUserForOrganisation(orgaId, userId, true);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void ApproveNoUserDenied() {
		String orgaId = "00000000-0000-0000-0004-300000000000";
		String userId = "00000000-0000-0000-0004-500000000000";
		
		controller.approveOrRejectUserForOrganisation(orgaId, userId, true);
	}
    
}
