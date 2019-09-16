package de.codeschluss.portal.components.provider;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.entity.BaseResource;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the providers database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "providers")
@Relation(collectionRelation = "data")
public class ProviderEntity extends BaseResource {
  
  private static final long serialVersionUID = 1L;
  
  @OneToMany(mappedBy = "provider", cascade = CascadeType.REMOVE)
  @JsonIgnore
  @ToString.Exclude
  private List<ActivityEntity> activities;

  @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
  @JsonProperty(access = Access.READ_ONLY)
  private boolean admin;

  @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
  @JsonProperty(access = Access.READ_ONLY)
  private boolean approved;

  @ManyToOne
  @JsonIgnore
  @ToString.Exclude
  @JoinColumn(nullable = false)
  private OrganisationEntity organisation;

  @ManyToOne
  @JsonIgnore
  @ToString.Exclude
  @JoinColumn(nullable = false)
  private UserEntity user;

  @Override
  public List<Link> createResourceLinks() {
    return new ArrayList<Link>();
  }
}