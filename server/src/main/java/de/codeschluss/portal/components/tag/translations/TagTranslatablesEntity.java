package de.codeschluss.portal.components.tag.translations;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.core.translations.annotations.Translatable;
import de.codeschluss.portal.core.translations.language.LanguageEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the tag translatables database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Translatable
@Table(name = "tag_translatables")
public class TagTranslatablesEntity extends BaseEntity {

  private static final long serialVersionUID = 1L;

  @Column(nullable = false)
  private String name;
  
  @ManyToOne(fetch = FetchType.EAGER)
  @JsonIgnore
  private LanguageEntity language;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JsonIgnore
  @JoinColumn(name = "parent_id")
  private TagEntity parent;
  
  public void setName(String name) {
    // TODO: More preparations
    this.name = name.trim();
  }

}