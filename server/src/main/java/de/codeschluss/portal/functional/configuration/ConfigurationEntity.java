package de.codeschluss.portal.functional.configuration;

import java.io.Serializable;

import javax.persistence.*;

import org.springframework.hateoas.core.Relation;

import de.codeschluss.portal.core.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the configurations database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "configurations")
@Relation(collectionRelation = "data")
public class ConfigurationEntity extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String item;

	private String value;
}