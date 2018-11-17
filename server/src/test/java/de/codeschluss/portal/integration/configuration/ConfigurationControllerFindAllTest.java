package de.codeschluss.portal.integration.configuration;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.core.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.configuration.ConfigurationController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ConfigurationControllerFindAllTest {

	@Autowired
	private ConfigurationController controller;
	
    private FilterSortPaginate params = new FilterSortPaginate("configuration", 0, 5, "item", "asc");
	
	@Test
	public void findAllWithoutPaginationOK() {
		FilterSortPaginate params = new FilterSortPaginate(null, null, null, "item", "asc");
		
		Resources<?> result = (Resources<?>) controller.findAll(params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test
	public void findAllEmptyParamsOK() {
		FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, null);
		
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
		FilterSortPaginate params = new FilterSortPaginate("configuration", 1, 5, "blablabla123", "wrong");
		controller.findAll(params);
	}
}
