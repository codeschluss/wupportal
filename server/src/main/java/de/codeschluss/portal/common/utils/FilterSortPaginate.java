package de.codeschluss.portal.common.utils;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class FilterSortPaginate extends SortPaginate {
	
	private String filter;
	
	public FilterSortPaginate(String filter, Integer page, Integer size, String sort, String dir) {
		super(page, size, sort, dir);
		this.filter = filter;
	}
}
