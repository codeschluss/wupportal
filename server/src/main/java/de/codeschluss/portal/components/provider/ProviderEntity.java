package de.codeschluss.portal.components.provider;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.common.BaseEntity;

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
public class ProviderEntity extends BaseEntity {
  private static final long serialVersionUID = 1L;

  @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
  private boolean admin;

  @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
  private boolean approved;

  @OneToMany(mappedBy = "provider", cascade = CascadeType.REMOVE)
  @JsonIgnore
  @ToString.Exclude
  private List<ActivityEntity> activities;

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

  @JsonProperty
  public boolean isAdmin() {
    return this.admin;
  }

  @JsonIgnore
  public void setAdmin(boolean isAdmin) {
    this.admin = isAdmin;
  }

  @JsonProperty
  public boolean isApproved() {
    return this.approved;
  }

  @JsonIgnore
  public void setApproved(boolean isApproved) {
    this.approved = isApproved;
  }
}