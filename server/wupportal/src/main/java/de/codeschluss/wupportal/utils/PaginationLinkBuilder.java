package de.codeschluss.wupportal.utils;

import java.lang.reflect.Field;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class PaginationLinkBuilder {

	public static Link createFirstLink(FilterSortPaginate params) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		
		addBaseParams(baseUri, params);
		baseUri.queryParam("page", 0);
		baseUri.queryParam("size", getValueOf("size", params));
			
		return new Link(baseUri.toUriString(), Link.REL_FIRST);
	}

	public static Link createPrevLink(FilterSortPaginate params, Pageable previousPageable) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();

		addBaseParams(baseUri, params);
		baseUri.queryParam("page", previousPageable.getPageNumber());
		baseUri.queryParam("size", previousPageable.getPageSize());
		
		return new Link(baseUri.toUriString(), Link.REL_PREVIOUS);
	}

	public static Link createNextLink(FilterSortPaginate params, Pageable nextPageable) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		
		addBaseParams(baseUri, params);
		baseUri.queryParam("page", nextPageable.getPageNumber());
		baseUri.queryParam("size", nextPageable.getPageSize());
		
		return new Link(baseUri.toUriString(), Link.REL_NEXT);
	}

	public static Link createLastLink(FilterSortPaginate params, Page<?> entitiesPaged) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();

		addBaseParams(baseUri, params);
		baseUri.queryParam("page", entitiesPaged.getTotalPages() - 1);
		baseUri.queryParam("size", getValueOf("size", params));
		
		return new Link(baseUri.toUriString(), Link.REL_LAST);
	}
	
	private static void addBaseParams(ServletUriComponentsBuilder baseUri, FilterSortPaginate params) {
		if (getValueOf("filter", params) != null) 
			baseUri.queryParam("filter", getValueOf("filter", params));
		
		if (getValueOf("sort", params) != null) 
			baseUri.queryParam("sort", getValueOf("sort", params));

		if (getValueOf("dir", params) != null) 
			baseUri.queryParam("dir", getValueOf("dir", params));		
	}

	private static Object getValueOf(String fieldname, FilterSortPaginate params) {
		try {
			Field field = params.getClass().getDeclaredField(fieldname);
			field.setAccessible(true);
			return field.get(params);
		} catch (IllegalArgumentException | IllegalAccessException | NoSuchFieldException | SecurityException e) {
			e.printStackTrace();
		}
		return null;
	}

}
