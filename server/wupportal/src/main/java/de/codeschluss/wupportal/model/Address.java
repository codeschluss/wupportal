package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

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
	private Suburb suburb;

	private float latitude;

	private float longitude;

	@OneToMany(mappedBy = "address")
	private List<Activity> activities;

	@OneToMany(mappedBy = "address")
	private List<Organisation> organisations;

	public Address() {
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

	public List<Activity> getActivities() {
		return this.activities;
	}

	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}

	public Suburb getSuburb() {
		return this.suburb;
	}

	public void setSuburb(Suburb suburb) {
		this.suburb = suburb;
	}

	public List<Organisation> getOrganisations() {
		return this.organisations;
	}

	public void setOrganisations(List<Organisation> organisations) {
		this.organisations = organisations;
	}

}