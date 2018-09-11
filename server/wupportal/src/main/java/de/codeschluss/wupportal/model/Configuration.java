package de.codeschluss.wupportal.model;

import java.io.Serializable;

import javax.persistence.*;

import de.codeschluss.wupportal.base.BaseEntity;

/**
 * The persistent class for the configurations database table.
 * 
 */
@Entity
@Table(name = "configurations")
public class Configuration extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String item;

	private String value;

	public Configuration() {
		super();
	}

	public String getItem() {
		return this.item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}