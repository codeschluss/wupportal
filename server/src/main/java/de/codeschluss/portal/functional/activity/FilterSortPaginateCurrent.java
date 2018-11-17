package de.codeschluss.portal.functional.activity;

import de.codeschluss.portal.core.utils.FilterSortPaginate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class FilterSortPaginateCurrent extends FilterSortPaginate {
	
	private Boolean current;
	
	public FilterSortPaginateCurrent(String filter, Integer page, Integer size, String sort, String dir, Boolean current) {
		super(filter, page, size, sort, dir);
		this.current = current;
	}
}
