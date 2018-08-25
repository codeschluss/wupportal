package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import de.codeschluss.wupportal.model.Activity;
import de.codeschluss.wupportal.model.BaseEntity;
import de.codeschluss.wupportal.model.Organisation;

/**
 * The persistent class for the providers database table.
 * 
 */
@Entity
@Table(name = "providers")
public class Provider extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private boolean admin;

	private boolean approved;

	@OneToMany(mappedBy = "provider")
	private List<Activity> activities;

	@ManyToOne
	private Organisation organisation;

	@ManyToOne
	private User user;

	public Provider() {
		super();
	}

	public boolean getAdmin() {
		return this.admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public boolean getApproved() {
		return this.approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public List<Activity> getActivities() {
		return this.activities;
	}

	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}

	public Organisation getOrganisation() {
		return this.organisation;
	}

	public void setOrganisation(Organisation organisation) {
		this.organisation = organisation;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}