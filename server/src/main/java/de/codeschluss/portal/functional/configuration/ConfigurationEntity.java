package de.codeschluss.portal.functional.configuration;

import de.codeschluss.portal.core.common.BaseEntity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.core.Relation;

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