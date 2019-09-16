package de.codeschluss.portal.components.address;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.suburb.SuburbEntity;
import de.codeschluss.portal.core.entity.BaseResource;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the addresses database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "addresses")
@Relation(collectionRelation = "data")
public class AddressEntity extends BaseResource {

  private static final long serialVersionUID = 1L;
  
  @OneToMany(mappedBy = "address")
  @JsonIgnore
  @ToString.Exclude
  private List<ActivityEntity> activities;
  
  @Column(nullable = true)
  private float latitude;

  @Column(nullable = true)
  private float longitude;
  
  @OneToMany(mappedBy = "address")
  @JsonIgnore
  @ToString.Exclude
  private List<OrganisationEntity> organisations;

  @Column(name = "house_number")
  private String houseNumber;

  private String place;

  @Column(name = "postal_code")
  private String postalCode;

  private String street;
  
  @Transient
  @JsonDeserialize
  private String suburbId;

  @ManyToOne
  @JsonIgnore
  private SuburbEntity suburb;
  
  @Override
  public List<Link> createResourceLinks() {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(AddressController.class)
        .readOne(id)).withSelfRel());
    links.add(linkTo(methodOn(AddressController.class)
        .readSuburb(id)).withRel("suburb"));

    return links;
  }
}