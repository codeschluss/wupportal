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
import de.codeschluss.portal.functional.schedule.ScheduleEntity;
import de.codeschluss.portal.functional.tag.TagEntity;
import de.codeschluss.portal.functional.targetgroup.TargetGroupEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(name="show_user")
	private boolean showUser;
	
	@Transient
	private String addressId;

	@ManyToOne
	@ToString.Exclude
	@JsonIgnore
	private AddressEntity address;
	
	@Transient
	private String categoryId;

	@ManyToOne
	@ToString.Exclude
	@JsonIgnore
	private CategoryEntity category;

	@Transient
	private String organisationId;
	
	@ManyToOne
	@ToString.Exclude
	@JsonIgnore
	private ProviderEntity provider;
	
	@OneToMany(mappedBy = "activity")
	@ToString.Exclude
	@JsonIgnore
	private List<ScheduleEntity> schedules;

	@ManyToMany
	@ToString.Exclude
	@JsonIgnore
	@JoinTable(
			name = "activities_tags",
			joinColumns = @JoinColumn(name = "activity_id"),
			inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private List<TagEntity> tags;
	
	@ManyToMany
	@ToString.Exclude
	@JsonIgnore
	@JoinTable(
			name = "activities_target_groups",
			joinColumns = @JoinColumn(name = "activity_id"),
			inverseJoinColumns = @JoinColumn(name = "target_group_id"))
	private List<TargetGroupEntity> targetGroups;	
}