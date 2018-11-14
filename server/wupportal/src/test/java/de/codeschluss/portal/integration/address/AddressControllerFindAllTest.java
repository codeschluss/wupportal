package de.codeschluss.portal.integration.address;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.address.AddressController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AddressControllerFindAllTest {

	@Autowired
	private AddressController controller;
	
    private FilterSortPaginate params = new FilterSortPaginate("address", 0, 5, "street", "asc");
	
	@Test
	public void findAllWithoutPaginationOK() {
		FilterSortPaginate params = new FilterSortPaginate(null, null, null, "street", "asc");
		
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
		FilterSortPaginate params = new FilterSortPaginate("address", 1, 5, "blablabla123", "wrong");
		controller.findAll(params);
	}
}
