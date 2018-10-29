package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.wupportal.activity.ActivityEntity;
import de.codeschluss.wupportal.base.BaseEntity;
import de.codeschluss.wupportal.organisation.OrganisationEntity;

/**
 * The persistent class for the addresses database table.
 * 
 */
@Entity
@Table(name = "addresses")
public class Address extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Column(name = "house_number")
	private String houseNumber;

	private String place;

	@Column(name = "postal_code")
	private String postalCode;

	private String street;

	@ManyToOne
	@JsonIgnore
	private Suburb suburb;

	private float latitude;

	private float longitude;

	@OneToMany(mappedBy = "address")
	@JsonIgnore
	private List<ActivityEntity> activities;

	@OneToMany(mappedBy = "address")
	@JsonIgnore
	private List<OrganisationEntity> organisations;

	public Address() {
		super();
	}

	public String getHouseNumber() {
		return this.houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}

	public float getLatitude() {
		return this.latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return this.longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public String getPlace() {
		return this.place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getPostalCode() {
		return this.postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getStreet() {
		return this.street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public List<ActivityEntity> getActivities() {
		return this.activities;
	}

	public void setActivities(List<ActivityEntity> activityEntities) {
		this.activities = activityEntities;
	}

	public Suburb getSuburb() {
		return this.suburb;
	}

	public void setSuburb(Suburb suburb) {
		this.suburb = suburb;
	}

	public List<OrganisationEntity> getOrganisations() {
		return this.organisations;
	}

	public void setOrganisations(List<OrganisationEntity> organisationEntities) {
		this.organisations = organisationEntities;
	}

}