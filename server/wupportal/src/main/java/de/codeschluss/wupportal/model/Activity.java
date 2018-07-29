package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

/**
 * The persistent class for the activities database table.
 * 
 */
@Entity
@Table(name="activities")
public class Activity extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;
	
	@Lob
	private String description;

	@Column(name="show_user")
	private boolean showUser;

	@ManyToOne
	private Address address;

	@ManyToOne
	private Category category;

	@ManyToOne
	private Provider provider;

	@ManyToMany()
	@JoinTable(
			name = "activities_tags",
			joinColumns = @JoinColumn(name = "activity_id"),
			inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private List<Tag> tags;

	@ManyToMany()
	@JoinTable(
			name = "activities_target_groups",
			joinColumns = @JoinColumn(name = "activity_id"),
			inverseJoinColumns = @JoinColumn(name = "target_group_id"))
	private List<TargetGroup> targetGroups;
	
	@OneToMany(mappedBy = "activity")
	private List<Schedule> schedules;

	public Activity() {
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

	public boolean getShowUser() {
		return this.showUser;
	}

	public void setShowUser(boolean showUser) {
		this.showUser = showUser;
	}

	public Address getAddress() {
		return this.address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Category getCategory() {
		return this.category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Provider getProvider() {
		return this.provider;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
	}

	public List<Tag> getTags() {
		return this.tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public List<TargetGroup> getTargetGroups() {
		return this.targetGroups;
	}

	public void setTargetGroups(List<TargetGroup> targetGroups) {
		this.targetGroups = targetGroups;
	}
	
	public List<Schedule> getSchedules() {
		return this.schedules;
	}

	public void setSchedules(List<Schedule> schedules) {
		this.schedules = schedules;
	}

}