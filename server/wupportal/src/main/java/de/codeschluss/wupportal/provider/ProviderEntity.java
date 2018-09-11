package de.codeschluss.wupportal.provider;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import org.springframework.hateoas.core.Relation;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.wupportal.base.BaseEntity;
import de.codeschluss.wupportal.model.Activity;
import de.codeschluss.wupportal.model.Organisation;
import de.codeschluss.wupportal.user.UserEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the providers database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
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
	private List<Activity> activities;

	@ManyToOne
	@JsonIgnore
	private Organisation organisation;

	@ManyToOne
	@JsonIgnore
	private UserEntity user;
}