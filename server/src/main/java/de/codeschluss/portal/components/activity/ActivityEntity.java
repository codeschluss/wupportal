package de.codeschluss.portal.components.activity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import de.codeschluss.portal.components.activity.translations.ActivityTranslatablesEntity;
import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.components.category.CategoryEntity;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.schedule.ScheduleEntity;
import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;
import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.core.translations.annotations.Localized;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.hibernate.annotations.CollectionId;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the activities database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Localized
@Table(name = "activities")
@Relation(collectionRelation = "data")
public class ActivityEntity extends BaseEntity {

  private static final long serialVersionUID = 1L;

  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String name;

  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String description;
  
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "activity")
  @ToString.Exclude
  @JsonIgnore
  private List<ActivityTranslatablesEntity> translatables;

  @Column(name = "show_user", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
  private boolean showUser;

  @Transient
  @JsonDeserialize
  private String addressId;

  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JsonIgnore
  private AddressEntity address;

  @Transient
  @JsonDeserialize
  private String categoryId;

  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JsonIgnore
  @JoinColumn(nullable = false)
  private CategoryEntity category;

  @Transient
  @JsonDeserialize
  private String organisationId;

  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JsonIgnore
  @JoinColumn(nullable = false)
  private ProviderEntity provider;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "activity")
  @ToString.Exclude
  @JsonIgnore
  private List<ScheduleEntity> schedules;

  @ManyToMany(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JsonIgnore
  @JoinTable(
      name = "activities_tags", 
      joinColumns = @JoinColumn(name = "activity_id"),
      inverseJoinColumns = @JoinColumn(name = "tag_id"),
      uniqueConstraints = {
          @UniqueConstraint(columnNames = { "activity_id", "tag_id" })
      })
  @GenericGenerator(
      name = "UUID",
      strategy = "org.hibernate.id.UUIDGenerator"
  )
  @CollectionId(
      columns = @Column(name = "id"), 
      type = @Type(type = "uuid-char"),
      generator = "UUID"
  )
  private List<TagEntity> tags;

  @ManyToMany(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JsonIgnore
  @JoinTable(
      name = "activities_target_groups", 
      joinColumns = @JoinColumn(name = "activity_id"),
      inverseJoinColumns = @JoinColumn(name = "target_group_id"),
      uniqueConstraints = {
          @UniqueConstraint(columnNames = { "activity_id", "target_group_id" })
      })
  @GenericGenerator(
      name = "UUID",
      strategy = "org.hibernate.id.UUIDGenerator"
  )
  @CollectionId(
      columns = @Column(name = "id"), 
      type = @Type(type = "uuid-char"),
      generator = "UUID"
  )
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