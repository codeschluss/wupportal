package de.codeschluss.wupportal.organisation;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import de.codeschluss.wupportal.base.BaseEntity;
import de.codeschluss.wupportal.model.Address;
import de.codeschluss.wupportal.provider.ProviderEntity;

/**
 * The persistent class for the organisations database table.
 * 
 */
@Entity
@Table(name = "organisations")
public class OrganisationEntity extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Lob
	private String description;

	@Lob
	private byte[] image;

	private String mail;

	private String name;

	private String phone;

	private String website;
	
	@ManyToOne
	private Address address;

	@OneToMany(mappedBy = "organisation")
	private List<ProviderEntity> providerEntities;

	public OrganisationEntity() {
		super();
	}
	
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getImage() {
		return this.image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getMail() {
		return this.mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getWebsite() {
		return this.website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public Address getAddress() {
		return this.address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<ProviderEntity> getProviders() {
		return this.providerEntities;
	}

	public void setProviders(List<ProviderEntity> providerEntities) {
		this.providerEntities = providerEntities;
	}

}