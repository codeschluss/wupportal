package de.codeschluss.portal.functional.activity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import org.springframework.hateoas.core.Relation;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.common.base.BaseEntity;
import de.codeschluss.portal.functional.address.AddressEntity;
import de.codeschluss.portal.functional.category.CategoryEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.schedule.Schedule;
import de.codeschluss.portal.functional.tag.Tag;
import de.codeschluss.portal.functional.targetgroup.TargetGroup;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the activities database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name="activities")
@Relation(collectionRelation = "data")
public class ActivityEntity extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;
	
	@Lob
	private String description;

	@Column(name="show_user")
	private boolean showUser;

	@ManyToOne
	@JsonIgnore
	private AddressEntity address;

	@ManyToOne
	@JsonIgnore
	private CategoryEntity category;

	@ManyToOne
	@JsonIgnore
	private ProviderEntity provider;

	@ManyToMany
	@JsonIgnore
	@JoinTable(
			name = "activities_tags",
			joinColumns = @JoinColumn(name = "activity_id"),
			inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private List<Tag> tags;

	@ManyToMany
	@JsonIgnore
	@JoinTable(
			name = "activities_target_groups",
			joinColumns = @JoinColumn(name = "activity_id"),
			inverseJoinColumns = @JoinColumn(name = "target_group_id"))
	private List<TargetGroup> targetGroups;
	
	@OneToMany(mappedBy = "activity")
	@JsonIgnore
	private List<Schedule> schedules;
}