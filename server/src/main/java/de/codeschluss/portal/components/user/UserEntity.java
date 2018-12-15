package de.codeschluss.portal.components.user;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.security.Sensible;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the users database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Sensible
@Table(name = "users")
@Relation(collectionRelation = "data")
public class UserEntity extends BaseResource {

  private static final long serialVersionUID = 1L;

  private String name;

  @Column(nullable = false)
  @JsonProperty(access = Access.WRITE_ONLY)
  private String password;

  private String phone;
  
  @Transient
  @JsonDeserialize
  private List<String> organisationRegistrations;
  
  @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
  @JsonIgnore
  @ToString.Exclude
  private List<ProviderEntity> providers;

  @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
  @JsonProperty(access = Access.READ_ONLY)
  private boolean superuser;

  @Column(unique = true, nullable = false)
  private String username;

  @Override
  public List<Link> createResourceLinks() {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(UserController.class)
        .readOne(getId())).withSelfRel());
    links.add(linkTo(methodOn(UserController.class)
        .readOrganisations(id, null)).withRel("organisations"));
    links.add(linkTo(methodOn(UserController.class)
        .readActivities(id, null)).withRel("activities"));

    return links;
  }

}