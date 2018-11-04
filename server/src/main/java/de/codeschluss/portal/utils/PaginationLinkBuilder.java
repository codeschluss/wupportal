package de.codeschluss.portal.utils;

import java.lang.reflect.Field;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class PaginationLinkBuilder {

	public static Link createFirstLink(SortPaginate params) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		
		addBaseParams(baseUri, params);
		baseUri.queryParam("page", 0);
		baseUri.queryParam("size", getValueOf("size", params));
			
		return new Link(baseUri.toUriString(), Link.REL_FIRST);
	}
	
	public static Link createSelfLink(SortPaginate params) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		
		addBaseParams(baseUri, params);
		baseUri.queryParam("page", getValueOf("page", params));
		baseUri.queryParam("size", getValueOf("size", params));
			
		return new Link(baseUri.toUriString()).withSelfRel();
	}


	public static Link createPrevLink(SortPaginate params, Pageable previousPageable) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();

		addBaseParams(baseUri, params);
		baseUri.queryParam("page", previousPageable.getPageNumber());
		baseUri.queryParam("size", previousPageable.getPageSize());
		
		return new Link(baseUri.toUriString(), Link.REL_PREVIOUS);
	}

	public static Link createNextLink(SortPaginate params, Pageable nextPageable) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		
		addBaseParams(baseUri, params);
		baseUri.queryParam("page", nextPageable.getPageNumber());
		baseUri.queryParam("size", nextPageable.getPageSize());
		
		return new Link(baseUri.toUriString(), Link.REL_NEXT);
	}

	public static Link createLastLink(SortPaginate params, Page<?> entitiesPaged) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();

		addBaseParams(baseUri, params);
		baseUri.queryParam("page", entitiesPaged.getTotalPages() - 1);
		baseUri.queryParam("size", getValueOf("size", params));
		
		return new Link(baseUri.toUriString(), Link.REL_LAST);
	}
	
	private static void addBaseParams(ServletUriComponentsBuilder baseUri, SortPaginate params) {
		if (params instanceof FilterSortPaginate) {
			if (getValueOf("filter", params) != null) 
				baseUri.queryParam("filter", getValueOf("filter", params));
		}

		if (getValueOf("sort", params) != null) 
			baseUri.queryParam("sort", getValueOf("sort", params));

		if (getValueOf("dir", params) != null) 
			baseUri.queryParam("dir", getValueOf("dir", params));		
	}

	private static Object getValueOf(String fieldname, SortPaginate params) {
		try {
			Field field = getField(fieldname, params);
			field.setAccessible(true);
			return field.get(params);
		} catch (IllegalArgumentException | IllegalAccessException | NoSuchFieldException | SecurityException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	private static Field getField(String fieldname, SortPaginate params) throws NoSuchFieldException, SecurityException {
		try {
			return params.getClass().getDeclaredField(fieldname);
		} catch(NoSuchFieldException ex) {
			return params.getClass().getSuperclass().getDeclaredField(fieldname);
		}
	}

}
