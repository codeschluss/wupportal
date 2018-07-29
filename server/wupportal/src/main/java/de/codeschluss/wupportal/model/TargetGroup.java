package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

/**
 * The persistent class for the target_groups database table.
 * 
 */
@Entity
@Table(name = "target_groups")
public class TargetGroup extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Lob
	private String description;

	private String name;

	@OneToMany(mappedBy = "targetGroups")
	private List<Activity> activities;

	public TargetGroup() {
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

	public void setActivitiesTargetGroups(List<Activity> activities) {
		this.activities = activities;
	}

}