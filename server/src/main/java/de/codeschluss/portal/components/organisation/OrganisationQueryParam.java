package de.codeschluss.portal.components.organisation;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

//TODO: Auto-generated Javadoc
/**
* The Class OrganisationQueryParam.
* 
* @author Valmir Etemi
*
*/
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class OrganisationQueryParam extends FilterSortPaginate {

  private Boolean approved;

  /**
   * Instantiates a new organisation query param.
   *
   * @param filter the filter
   * @param page the page
   * @param size the size
   * @param sort the sort
   * @param dir the dir
   * @param approved the approved
   */
  public OrganisationQueryParam(
      String filter, 
      Integer page, 
      Integer size, 
      String sort,
      String dir, 
      String embeddings,
      Boolean approved) {
    super(filter, page, size, sort, dir, embeddings);
    this.approved = approved;
  }
  
  @Override
  public boolean isEmptyQuery() {
    return super.isEmptyQuery()
        && approved == null;
  }  
}
