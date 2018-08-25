package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

/**
 * The persistent class for the tags database table.
 * 
 */
@Entity
@Table(name = "tags")
public class Tag extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Lob
	private String description;

	private String name;

	@ManyToMany(mappedBy = "tags")
	private List<Activity> activities;

	public Tag() {
		super();
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Activity> getActivities() {
		return this.activities;
	}

	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}

}