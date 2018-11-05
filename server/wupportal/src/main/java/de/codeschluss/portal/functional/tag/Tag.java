package de.codeschluss.portal.functional.tag;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import de.codeschluss.portal.common.base.BaseEntity;
import de.codeschluss.portal.functional.activity.ActivityEntity;

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
	private List<ActivityEntity> activityEntities;

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

	public List<ActivityEntity> getActivities() {
		return this.activityEntities;
	}

	public void setActivities(List<ActivityEntity> activityEntities) {
		this.activityEntities = activityEntities;
	}

}