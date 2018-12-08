package de.codeschluss.portal.components.targetgroup;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.targetgroup.translations.TargetGroupTranslatablesEntity;
import de.codeschluss.portal.core.i18n.annotations.Localized;
import de.codeschluss.portal.core.service.BaseEntity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the target_groups database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Localized
@Table(name = "target_groups")
@Relation(collectionRelation = "data")
public class TargetGroupEntity extends BaseEntity {

  private static final long serialVersionUID = 1L;

  @Lob
  @Column(columnDefinition = "TEXT")
  private String description;

  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String name;

  @ManyToMany(fetch = FetchType.LAZY, mappedBy = "targetGroups")
  @JsonIgnore
  private List<ActivityEntity> activities;
  
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  protected List<TargetGroupTranslatablesEntity> translatables;
}
