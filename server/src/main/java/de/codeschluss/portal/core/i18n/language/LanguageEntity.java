package de.codeschluss.portal.core.i18n.language;

import de.codeschluss.portal.core.service.BaseEntity;

import java.io.Serializable;

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
 * The persistent class for the languages database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "languages")
@Relation(collectionRelation = "data")
public class LanguageEntity extends BaseEntity implements Serializable {
  
  private static final long serialVersionUID = 1L;

  @Column(nullable = false, unique = true)
  private String locale;

  @Column(nullable = false, unique = true)
  private String name;
  
  private String machineTranslated;
}