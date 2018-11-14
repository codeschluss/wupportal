package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.activity.FilterSortPaginateCurrent;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerFindAllTest {

	@Autowired
	private ActivityController controller;
	
    private FilterSortPaginateCurrent params = new FilterSortPaginateCurrent("activity", 0, 5, "name", "asc", true);
	
	@Test
	public void findAllWithoutPaginationOK() {
		FilterSortPaginateCurrent params = new FilterSortPaginateCurrent(null, null, null, "name", "asc", true);
		
		Resources<?> result = (Resources<?>) controller.findAll(params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test
	public void findAllEmptyParamsOK() {
		FilterSortPaginateCurrent params = new FilterSortPaginateCurrent(null, null, null, null, null, null);
		
		Resources<?> result = (Resources<?>) controller.findAll(params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
    
	@Test
	public void findAllWithPaginationOK() {
		PagedResources<?> result = (PagedResources<?>) controller.findAll(params).getBody();
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test(expected = InvalidDataAccessApiUsageException.class)
	public void findAllWrongParams() {
		FilterSortPaginateCurrent params = new FilterSortPaginateCurrent("activity", 1, 5, "blablabla123", "wrong", true);
		controller.findAll(params);
	}
}
