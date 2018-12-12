package de.codeschluss.portal.components.activity;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

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
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.i18n.annotations.Localized;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
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
import org.springframework.hateoas.Link;
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
@GenericGenerator(
    name = "UUID",
    strategy = "org.hibernate.id.UUIDGenerator"
)
public class ActivityEntity extends BaseResource {

  private static final long serialVersionUID = 1L;

  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String name;

  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String description;

  @Column(name = "show_user", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
  private boolean showUser;

  @Transient
  @JsonDeserialize
  private String addressId;

  @ManyToOne
  @ToString.Exclude
  @JsonIgnore
  private AddressEntity address;

  @Transient
  @JsonDeserialize
  private String categoryId;

  @ManyToOne
  @ToString.Exclude
  @JsonIgnore
  @JoinColumn(nullable = false)
  private CategoryEntity category;

  @Transient
  @JsonDeserialize
  private String organisationId;

  @ManyToOne
  @ToString.Exclude
  @JsonIgnore
  @JoinColumn(nullable = false)
  private ProviderEntity provider;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "activity", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  private List<ScheduleEntity> schedules;

  @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  @JoinTable(
      name = "activities_tags", 
      joinColumns = @JoinColumn(name = "activity_id"),
      inverseJoinColumns = @JoinColumn(name = "tag_id"),
      uniqueConstraints = {
          @UniqueConstraint(columnNames = { "activity_id", "tag_id" })
      })
  @CollectionId(
      columns = @Column(name = "id"), 
      type = @Type(type = "uuid-char"),
      generator = "UUID"
  )
  private List<TagEntity> tags;

  @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  @JoinTable(
      name = "activities_target_groups", 
      joinColumns = @JoinColumn(name = "activity_id"),
      inverseJoinColumns = @JoinColumn(name = "target_group_id"),
      uniqueConstraints = {
          @UniqueConstraint(columnNames = { "activity_id", "target_group_id" })
      })
  @CollectionId(
      columns = @Column(name = "id"), 
      type = @Type(type = "uuid-char"),
      generator = "UUID"
  )
  private List<TargetGroupEntity> targetGroups;
  
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  protected Set<ActivityTranslatablesEntity> translatables;

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

  @Override
  public List<Link> createResourceLinks() {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(ActivityController.class)
        .readOne(id)).withSelfRel());
    links.add(linkTo(methodOn(ActivityController.class)
        .readOrganisation(id)).withRel("organisation"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readUser(id)).withRel("user"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readCategory(id)).withRel("category"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readSchedules(id, null)).withRel("schedules"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readTags(id, null)).withRel("tags"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readTargetGroups(id, null)).withRel("targetgroups"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readAddress(id)).withRel("address"));
    links.add(linkTo(methodOn(ActivityController.class)
        .readTranslations(id)).withRel("translations"));

    return links;
  }
}