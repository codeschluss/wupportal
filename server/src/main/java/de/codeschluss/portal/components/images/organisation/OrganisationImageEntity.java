package de.codeschluss.portal.components.images.organisation;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.core.service.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.core.Relation;
import org.springframework.util.Base64Utils;

/**
 * The persistent class for the organisation_images database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "organisation_images")
@Relation(collectionRelation = "data")
public class OrganisationImageEntity extends BaseEntity {
  
  private static final long serialVersionUID = 1L;
  
  private String caption;
  
  @Lob
  @Column(columnDefinition = "MEDIUMBLOB", nullable = false)
  private byte[] image;
  
  @Column(name = "mime_type", nullable = false)
  private String mimeType;
  
  @ManyToOne
  @JsonIgnore
  private OrganisationEntity organisation;
  
  public byte[] getImage() {
    return Base64Utils.encode(image);
  }

}
