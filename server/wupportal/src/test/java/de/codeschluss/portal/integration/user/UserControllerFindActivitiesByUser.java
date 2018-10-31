package de.codeschluss.portal.integration.user;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.user.UserController;
import de.codeschluss.portal.utils.SortPaginate;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerFindActivitiesByUser {
	
    @Autowired
    private UserController controller;
    
    private SortPaginate params = new SortPaginate(0, 5, "id", "asc");
	
	@Test
	public void findActivitiesByUserWithoutPaginationSuperUserOK() {
		SortPaginate params = new SortPaginate(null, null, null, "asc");
		
		Resources<?> result = (Resources<?>) controller.findActivitiesByUser("00000000-0000-0000-0004-300000000000", params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test
	public void findProvidersByUserEmptyParamsSuperUserOK() {
		SortPaginate params = new SortPaginate(null, null, null, null);
		
		Resources<?> result = (Resources<?>) controller.findActivitiesByUser("00000000-0000-0000-0004-300000000000", params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
    
	@Test
	public void findProvidersByUserWithPaginationSuperUserOK() {
		PagedResources<?> result = (PagedResources<?>) controller.findActivitiesByUser("00000000-0000-0000-0004-300000000000", params).getBody();
		assertThat(result.getContent()).isNotEmpty();
	}
	

}
