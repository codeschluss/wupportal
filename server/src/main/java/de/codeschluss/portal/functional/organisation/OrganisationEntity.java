package de.codeschluss.portal.functional.organisation;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import org.springframework.hateoas.core.Relation;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.common.base.BaseEntity;
import de.codeschluss.portal.functional.address.AddressEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * The persistent class for the organisations database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "organisations")
@Relation(collectionRelation = "data")
public class OrganisationEntity extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Lob
	@Column(columnDefinition = "TEXT")
	private String description;

	@Lob
	@Column(columnDefinition = "MEDIUMBLOB")
	private byte[] image;

	private String mail;
	
	private String name;

	private String phone;

	private String website;
	
	@ManyToOne
	@JsonIgnore
	@ToString.Exclude
	private AddressEntity address;

	@OneToMany(mappedBy = "organisation")
	@JsonIgnore
	@ToString.Exclude
	private List<ProviderEntity> providers;
}
