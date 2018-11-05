package de.codeschluss.portal.functional.configuration;

import java.io.Serializable;

import javax.persistence.*;

import de.codeschluss.portal.common.base.BaseEntity;
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
public class ConfigurationEntity extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String item;

	private String value;
}