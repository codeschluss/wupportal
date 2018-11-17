package de.codeschluss.portal.functional.suburb;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import org.springframework.hateoas.core.Relation;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.functional.address.AddressEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the suburbs database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "suburbs")
@Relation(collectionRelation = "data")
public class SuburbEntity extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;

	@OneToMany(mappedBy = "suburb")
	@JsonIgnore
	private List<AddressEntity> addresses;

}