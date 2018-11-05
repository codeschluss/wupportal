package de.codeschluss.portal.functional.suburb;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.common.base.BaseEntity;
import de.codeschluss.portal.functional.address.AddressEntity;

/**
 * The persistent class for the suburbs database table.
 * 
 */
@Entity
@Table(name = "suburbs")
public class Suburb extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;

	@OneToMany(mappedBy = "suburb")
	@JsonIgnore
	private List<AddressEntity> addresses;

	public Suburb() {
		super();
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<AddressEntity> getAddresses() {
		return this.addresses;
	}

	public void setAddresses(List<AddressEntity> addresses) {
		this.addresses = addresses;
	}

}