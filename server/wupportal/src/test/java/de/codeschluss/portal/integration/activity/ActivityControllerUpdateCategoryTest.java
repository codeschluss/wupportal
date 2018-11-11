package de.codeschluss.portal.integration.activity;

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

import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.category.CategoryEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerUpdateCategoryTest {
	
	@Autowired
	private ActivityController controller;	
	
	@Test
	@WithUserDetails("super@user")
	public void updateCategorySuperUserOK() throws URISyntaxException {
		String categoryId = "00000000-0000-0000-0007-300000000000";
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		controller.updateCategory(activityId, categoryId);
		
		Resource<CategoryEntity> result = (Resource<CategoryEntity>) controller.findCategory(activityId).getBody();
		assertThat(result.getContent().getId()).isEqualTo(categoryId);
	}
	
	@Test
	@WithUserDetails("provider1@user")
	public void updateProviderOK() throws URISyntaxException {
		String categoryId = "00000000-0000-0000-0007-200000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.updateCategory(activityId, categoryId);
		
		Resource<CategoryEntity> result = (Resource<CategoryEntity>) controller.findCategory(activityId).getBody();
		assertThat(result.getContent().getId()).isEqualTo(categoryId);
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void updateAdminOK() throws URISyntaxException {
		String categoryId = "00000000-0000-0000-0007-100000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.updateCategory(activityId, categoryId);
		
		Resource<CategoryEntity> result = (Resource<CategoryEntity>) controller.findCategory(activityId).getBody();
		assertThat(result.getContent().getId()).isEqualTo(categoryId);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void updateSuperActivityBadParam() throws URISyntaxException {
		String categoryId = "00000000-0000-0000-0007-300000000000";
		String activityId = "00000000-0000-0000-0010-XX0000000000";
		
		controller.updateCategory(activityId, categoryId);
		
		Resource<CategoryEntity> result = (Resource<CategoryEntity>) controller.findCategory(activityId).getBody();
		assertThat(result.getContent().getId()).isEqualTo(categoryId);
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("provider1@user")
	public void updateProviderCategoryBadParam() throws URISyntaxException {
		String categoryId = "00000000-0000-0000-0007-XX0000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.updateCategory(activityId, categoryId);
		
		Resource<CategoryEntity> result = (Resource<CategoryEntity>) controller.findCategory(activityId).getBody();
		assertThat(result.getContent().getId()).isEqualTo(categoryId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void updateOtherProviderDenied() throws URISyntaxException {
		String categoryId = "00000000-0000-0000-0007-300000000000";
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.updateCategory(activityId, categoryId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void updateNoUserDenied() throws URISyntaxException {
		String categoryId = "00000000-0000-0000-0007-300000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.updateCategory(activityId, categoryId);
	}
}
