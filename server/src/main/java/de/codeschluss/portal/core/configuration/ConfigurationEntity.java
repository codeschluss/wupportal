package de.codeschluss.portal.core.configuration;

import de.codeschluss.portal.core.service.BaseEntity;

import javax.persistence.Column;
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
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "configurations")
@Relation(collectionRelation = "data")
public class ConfigurationEntity extends BaseEntity {
  
  private static final long serialVersionUID = 1L;

  @Column(nullable = false)
  private String item;

  @Column(nullable = false)
  private String value;
}