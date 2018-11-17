package de.codeschluss.portal.functional.address;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import org.springframework.hateoas.core.Relation;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.functional.activity.ActivityEntity;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.suburb.SuburbEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * The persistent class for the addresses database table.
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

	private float latitude;

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