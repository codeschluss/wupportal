package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import de.codeschluss.wupportal.base.BaseEntity;

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
	private List<Address> addresses;

	public Suburb() {
		super();
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Address> getAddresses() {
		return this.addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

}