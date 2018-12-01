package de.codeschluss.portal.components.suburb;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.core.common.BaseEntity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the suburbs database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "suburbs")
@Relation(collectionRelation = "data")
public class SuburbEntity extends BaseEntity {

  private static final long serialVersionUID = 1L;

  @Column(unique = true, nullable = false)
  private String name;

  @OneToMany(mappedBy = "suburb")
  @JsonIgnore
  private List<AddressEntity> addresses;

}