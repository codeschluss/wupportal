package de.codeschluss.portal.common.utils;

import org.springframework.data.domain.Sort;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class SortPaginate {
	
	private Integer page;
	private Integer size;
	private String sort;
	private String dir;
	
	public Sort createSort(String defaultValue) {
		
		Sort.Direction direction = dir == null || dir.equals(Sort.Direction.ASC.toString())
				? Sort.Direction.ASC
				: Sort.Direction.DESC;
		
		sort = sort == null || sort.isEmpty()
				? defaultValue
				: sort;
		
		return new Sort(direction, sort);
	}
	
}
