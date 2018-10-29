package de.codeschluss.wupportal.integration.user;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.wupportal.user.UserController;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerFindActivitiesByUser {
	
    @Autowired
    private UserController controller;
    
    private FilterSortPaginate params = new FilterSortPaginate(null, 0, 5, "id", "asc");
	
	@Test
	public void findActivitiesByUserWithoutPaginationSuperUserOK() {
		FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, "asc");
		
		Resources<?> result = (Resources<?>) controller.findActivitiesByUser("00000000-0000-0000-0004-300000000000", params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test
	public void findProvidersByUserEmptyParamsSuperUserOK() {
		FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, null);
		
		Resources<?> result = (Resources<?>) controller.findActivitiesByUser("00000000-0000-0000-0004-300000000000", params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
    
	@Test
	public void findProvidersByUserWithPaginationSuperUserOK() {
		PagedResources<?> result = (PagedResources<?>) controller.findActivitiesByUser("00000000-0000-0000-0004-300000000000", params).getBody();
		assertThat(result.getContent()).isNotEmpty();
	}
	

}
