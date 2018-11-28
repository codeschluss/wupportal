package de.codeschluss.portal.components.address;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.suburb.SuburbEntity;
import de.codeschluss.portal.core.common.BaseEntity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
public class AddressEntity extends BaseEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  @Column(name = "house_number")
  private String houseNumber;

  private String place;

  @Column(name = "postal_code")
  private String postalCode;

  private String street;

  @ManyToOne
  @JsonIgnore
  private SuburbEntity suburb;

  @Column(nullable = true)
  private float latitude;

  @Column(nullable = true)
  private float longitude;

  @OneToMany(mappedBy = "address")
  @JsonIgnore
  @ToString.Exclude
  private List<ActivityEntity> activities;

  @OneToMany(mappedBy = "address")
  @JsonIgnore
  @ToString.Exclude
  private List<OrganisationEntity> organisations;
}