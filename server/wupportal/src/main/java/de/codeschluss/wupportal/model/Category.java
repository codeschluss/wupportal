package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import de.codeschluss.wupportal.base.BaseEntity;

/**
 * The persistent class for the categories database table.
 * 
 */
@Entity
@Table(name = "categories")
public class Category extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String color;

	@Lob
	private String description;

	private String name;

	@OneToMany(mappedBy = "category")
	private List<Activity> activities;

	public Category() {
		super();
	}

	public String getColor() {
		return this.color;
	}

	public void setColor(String color) {
		this.color = color;
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