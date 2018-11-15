package de.codeschluss.portal.common.utils;

import java.lang.reflect.Field;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class PaginationLinkBuilder {

	public static Link createSelfLink(Object params) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		if (params != null) {
			addParamsToUri(LinkType.SELF, baseUri, params.getClass(), params, null);			
		}
		return new Link(baseUri.toUriString()).withSelfRel();
	}
	
	public static Link createFirstLink(Object params) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		addParamsToUri(LinkType.FIRST, baseUri, params.getClass(), params, null);	
		return new Link(baseUri.toUriString(), Link.REL_FIRST);
	}
	
	public static Link createPrevLink(Object params, Pageable previousPageable) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		addParamsToUri(LinkType.PREV, baseUri, params.getClass(), params, previousPageable);			
		return new Link(baseUri.toUriString(), Link.REL_PREVIOUS);
	}

	public static Link createNextLink(Object params, Pageable nextPageable) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		addParamsToUri(LinkType.NEXT, baseUri, params.getClass(), params, nextPageable);
		return new Link(baseUri.toUriString(), Link.REL_NEXT);
	}

	public static Link createLastLink(Object params, Page<?> entitiesPaged) {
		ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
		addParamsToUri(LinkType.LAST, baseUri, params.getClass(), params, entitiesPaged);		
		return new Link(baseUri.toUriString(), Link.REL_LAST);
	}
	
	private static void addParamsToUri(
			LinkType linkType, 
			ServletUriComponentsBuilder uri,
			Class<?> clazz,	
			Object params, 
			Object page) {
		try {
			for (Field field : clazz.getDeclaredFields()) {
				field.setAccessible(true);
				Object value = null;
				switch(linkType) {
				case FIRST:
					value = getValueForFirst(field,params);
					break;
				case SELF:
					value = getValueForSelf(field,params);
					break;
				case PREV:
				case NEXT:
					value = getValueForPrevNext(field, params, (Pageable) page);
					break;
				case LAST:
					value = getValueForLast(field, params, (Page<?>) page);
					break;
				}
				uri.queryParam(field.getName(), value);
			}
			
			if (clazz.getSuperclass() != null) {
				addParamsToUri(linkType, uri,clazz.getSuperclass(), params, page);
			}
			
		} catch (IllegalArgumentException | IllegalAccessException e) {
			e.printStackTrace();
		}
	}
	private static Object getValueForFirst(Field field, Object params) throws IllegalArgumentException, IllegalAccessException {
		return field.getName().equals("page")
				? 0
				: field.get(params);
	}
	
	private static Object getValueForSelf(Field field, Object params) throws IllegalArgumentException, IllegalAccessException {
		return field.get(params);
	}
	
	private static Object getValueForPrevNext(Field field, Object params, Pageable page) throws IllegalArgumentException, IllegalAccessException {		
		if (field.getName().equals("page")) {
			return page.getPageNumber();
		}
		
		if (field.getName().equals("size")) {
			return page.getPageSize();
		}
		
		return field.get(params);
	}
	
	private static Object getValueForLast(Field field, Object params, Page<?> page) throws IllegalArgumentException, IllegalAccessException {
		return field.getName().equals("page")
				? page.getTotalPages() - 1
				: field.get(params);		
	}
	
	private enum LinkType {
		FIRST, SELF, PREV, NEXT, LAST
	}
}
