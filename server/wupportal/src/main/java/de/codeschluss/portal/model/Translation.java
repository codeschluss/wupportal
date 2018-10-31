package de.codeschluss.portal.model;

import java.io.Serializable;
import javax.persistence.*;

import de.codeschluss.portal.base.BaseEntity;

/**
 * The persistent class for the translations database table.
 * 
 */
@Entity
@Table(name = "translations")
public class Translation extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String locale;

	private String name;

	public Translation() {
		super();
	}

	public String getLocale() {
		return this.locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}