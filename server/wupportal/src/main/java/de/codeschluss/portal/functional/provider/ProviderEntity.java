package de.codeschluss.portal.functional.provider;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import org.springframework.hateoas.core.Relation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import de.codeschluss.portal.common.base.BaseEntity;
import de.codeschluss.portal.functional.activity.ActivityEntity;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.user.UserEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * The persistent class for the providers database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "providers")
@Relation(collectionRelation = "data")
public class ProviderEntity extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private boolean admin;

	private boolean approved;

	@OneToMany(mappedBy = "provider")
	@JsonIgnore
	@ToString.Exclude
	private List<ActivityEntity> activities;

	@ManyToOne
	@JsonIgnore
	@ToString.Exclude
	private OrganisationEntity organisation;

	@ManyToOne
	@JsonIgnore
	@ToString.Exclude
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