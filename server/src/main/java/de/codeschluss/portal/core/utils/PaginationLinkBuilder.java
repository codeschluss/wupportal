package de.codeschluss.portal.core.utils;

import java.lang.reflect.Field;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

// TODO: Auto-generated Javadoc
/**
 * The Class PaginationLinkBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Component
public class PaginationLinkBuilder {

  /**
   * Creates the self link.
   *
   * @param params
   *          the params
   * @return the link
   */
  public static Link createSelfLink(Object params) {
    ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
    if (params != null) {
      addParamsToUri(LinkType.SELF, baseUri, params.getClass(), params, null);
    }
    return new Link(baseUri.toUriString()).withSelfRel();
  }

  /**
   * Creates the first link.
   *
   * @param params
   *          the params
   * @return the link
   */
  public static Link createFirstLink(Object params) {
    ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
    addParamsToUri(LinkType.FIRST, baseUri, params.getClass(), params, null);
    return new Link(baseUri.toUriString(), Link.REL_FIRST);
  }

  /**
   * Creates the prev link.
   *
   * @param params
   *          the params
   * @param previousPageable
   *          the previous pageable
   * @return the link
   */
  public static Link createPrevLink(Object params, Pageable previousPageable) {
    ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
    addParamsToUri(LinkType.PREV, baseUri, params.getClass(), params, previousPageable);
    return new Link(baseUri.toUriString(), Link.REL_PREVIOUS);
  }

  /**
   * Creates the next link.
   *
   * @param params
   *          the params
   * @param nextPageable
   *          the next pageable
   * @return the link
   */
  public static Link createNextLink(Object params, Pageable nextPageable) {
    ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
    addParamsToUri(LinkType.NEXT, baseUri, params.getClass(), params, nextPageable);
    return new Link(baseUri.toUriString(), Link.REL_NEXT);
  }

  /**
   * Creates the last link.
   *
   * @param params
   *          the params
   * @param entitiesPaged
   *          the entities paged
   * @return the link
   */
  public static Link createLastLink(Object params, Page<?> entitiesPaged) {
    ServletUriComponentsBuilder baseUri = ServletUriComponentsBuilder.fromCurrentRequestUri();
    addParamsToUri(LinkType.LAST, baseUri, params.getClass(), params, entitiesPaged);
    return new Link(baseUri.toUriString(), Link.REL_LAST);
  }

  /**
   * Adds the params to uri.
   *
   * @param linkType
   *          the link type
   * @param uri
   *          the uri
   * @param clazz
   *          the clazz
   * @param params
   *          the params
   * @param page
   *          the page
   */
  private static void addParamsToUri(LinkType linkType, ServletUriComponentsBuilder uri,
      Class<?> clazz, Object params, Object page) {
    try {
      for (Field field : clazz.getDeclaredFields()) {
        field.setAccessible(true);
        Object value = null;
        switch (linkType) {
          case FIRST:
            value = getValueForFirst(field, params);
            break;
          case SELF:
            value = getValueForSelf(field, params);
            break;
          case PREV:
          case NEXT:
            value = getValueForPrevNext(field, params, (Pageable) page);
            break;
          case LAST:
            value = getValueForLast(field, params, (Page<?>) page);
            break;
          default:
            break;
        }
        if (value != null) {
          uri.queryParam(field.getName(), value);
        }
      }

      if (clazz.getSuperclass() != null) {
        addParamsToUri(linkType, uri, clazz.getSuperclass(), params, page);
      }

    } catch (IllegalArgumentException | IllegalAccessException e) {
      e.printStackTrace();
    }
  }

  /**
   * Gets the value for first.
   *
   * @param field
   *          the field
   * @param params
   *          the params
   * @return the value for first
   * @throws IllegalArgumentException
   *           the illegal argument exception
   * @throws IllegalAccessException
   *           the illegal access exception
   */
  private static Object getValueForFirst(Field field, Object params)
      throws IllegalArgumentException, IllegalAccessException {
    return field.getName().equals("page") ? 0 : field.get(params);
  }

  /**
   * Gets the value for self.
   *
   * @param field
   *          the field
   * @param params
   *          the params
   * @return the value for self
   * @throws IllegalArgumentException
   *           the illegal argument exception
   * @throws IllegalAccessException
   *           the illegal access exception
   */
  private static Object getValueForSelf(Field field, Object params)
      throws IllegalArgumentException, IllegalAccessException {
    return field.get(params);
  }

  /**
   * Gets the value for prev next.
   *
   * @param field
   *          the field
   * @param params
   *          the params
   * @param page
   *          the page
   * @return the value for prev next
   * @throws IllegalArgumentException
   *           the illegal argument exception
   * @throws IllegalAccessException
   *           the illegal access exception
   */
  private static Object getValueForPrevNext(Field field, Object params, Pageable page)
      throws IllegalArgumentException, IllegalAccessException {
    if (field.getName().equals("page")) {
      return page.getPageNumber();
    }

    if (field.getName().equals("size")) {
      return page.getPageSize();
    }

    return field.get(params);
  }

  /**
   * Gets the value for last.
   *
   * @param field
   *          the field
   * @param params
   *          the params
   * @param page
   *          the page
   * @return the value for last
   * @throws IllegalArgumentException
   *           the illegal argument exception
   * @throws IllegalAccessException
   *           the illegal access exception
   */
  private static Object getValueForLast(Field field, Object params, Page<?> page)
      throws IllegalArgumentException, IllegalAccessException {
    return field.getName().equals("page") ? page.getTotalPages() - 1 : field.get(params);
  }

  /**
   * The Enum LinkType.
   */
  private enum LinkType {

    /** The first. */
    FIRST,
    /** The self. */
    SELF,
    /** The prev. */
    PREV,
    /** The next. */
    NEXT,
    /** The last. */
    LAST
  }
}
