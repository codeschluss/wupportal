package de.codeschluss.portal.components.organisation;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.components.images.organisation.OrganisationImageEntity;
import de.codeschluss.portal.components.organisation.translations.OrganisationTranslatablesEntity;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.i18n.annotations.Localized;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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

import org.hibernate.annotations.GenericGenerator;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the organisations database table.
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
@Table(name = "organisations")
@Relation(collectionRelation = "data")
@GenericGenerator(
    name = "UUID",
    strategy = "org.hibernate.id.UUIDGenerator"
)
public class OrganisationEntity extends BaseResource {
  
  private static final long serialVersionUID = 1L;
  
  @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
  private boolean approved;

  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String description;

  private String mail;

  @Column(unique = true, nullable = false)
  private String name;

  private String phone;
  
  @Column(name = "video_url")
  private String videoUrl;

  private String website;

  @ManyToOne
  @JsonIgnore
  @ToString.Exclude
  private AddressEntity address;

  @OneToMany(mappedBy = "organisation", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  @JsonIgnore
  @ToString.Exclude
  private List<ProviderEntity> providers;
  
  @OneToMany(mappedBy = "organisation", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  @JsonIgnore
  @ToString.Exclude
  private List<OrganisationImageEntity> images;
  
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent", cascade = CascadeType.REMOVE)
  @JsonIgnore
  @ToString.Exclude
  protected Set<OrganisationTranslatablesEntity> translatables;
  
  @JsonProperty
  public boolean isApproved() {
    return this.approved;
  }

  @JsonIgnore
  public void setApproved(boolean approved) {
    this.approved = approved;
  }

  @Override
  public List<Link> createResourceLinks() {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(OrganisationController.class)
        .readOne(id)).withSelfRel());
    links.add(linkTo(methodOn(OrganisationController.class)
        .readActivities(id, null)).withRel("activities"));
    links.add(linkTo(methodOn(OrganisationController.class)
        .readUsers(id, null)).withRel("users"));
    links.add(linkTo(methodOn(OrganisationController.class)
        .readAddress(id)).withRel("address"));
    links.add(linkTo(methodOn(OrganisationController.class)
        .readTranslations(id)).withRel("translations"));

    return links;
  }
}
