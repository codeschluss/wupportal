package de.codeschluss.portal.functional.activity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.functional.address.AddressEntity;
import de.codeschluss.portal.functional.category.CategoryEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.schedule.ScheduleEntity;
import de.codeschluss.portal.functional.tag.TagEntity;
import de.codeschluss.portal.functional.targetgroup.TargetGroupEntity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.hibernate.annotations.SQLInsert;

import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the activities database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "activities")
@Relation(collectionRelation = "data")
public class ActivityEntity extends BaseEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  private String name;

  @Lob
  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(name = "show_user")
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
  @SQLInsert(
      sql = "insert into activities_tags " + "(id, activity_id, tag_id) values (UUID(), ?, ?)")
  private List<TagEntity> tags;

  @ManyToMany
  @ToString.Exclude
  @JsonIgnore
  @JoinTable(
      name = "activities_target_groups", 
      joinColumns = @JoinColumn(name = "activity_id"), 
      inverseJoinColumns = @JoinColumn(name = "target_group_id"))
  @SQLInsert(
      sql = "insert into activities_target_groups " 
            + "(id, activity_id, target_group_id) values (UUID(), ?, ?)")
  private List<TargetGroupEntity> targetGroups;

  @JsonIgnore
  public String getAddressId() {
    return this.addressId;
  }

  @JsonIgnore
  public String getCategoryId() {
    return this.categoryId;
  }

  @JsonIgnore
  public String getOrganisationId() {
    return this.organisationId;
  }
}