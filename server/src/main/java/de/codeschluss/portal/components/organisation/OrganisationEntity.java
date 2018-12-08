package de.codeschluss.portal.components.organisation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.components.images.organisation.OrganisationImageEntity;
import de.codeschluss.portal.components.organisation.translations.OrganisationTranslatablesEntity;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.core.service.BaseEntity;

import java.util.List;

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
@Table(name = "organisations")
@Relation(collectionRelation = "data")
@GenericGenerator(
    name = "UUID",
    strategy = "org.hibernate.id.UUIDGenerator"
)
public class OrganisationEntity extends BaseEntity {
  
  private static final long serialVersionUID = 1L;

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
  protected List<OrganisationTranslatablesEntity> translatables;
}
