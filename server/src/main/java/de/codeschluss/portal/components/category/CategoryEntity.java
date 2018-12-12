package de.codeschluss.portal.components.category;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.category.translations.CategoryTranslatablesEntity;
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.i18n.annotations.Localized;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the categories database table.
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
@Table(name = "categories")
@Relation(collectionRelation = "data")
public class CategoryEntity extends BaseResource {

  private static final long serialVersionUID = 1L;

  @Column(unique = true, nullable = false)
  private String color;

  @Lob
  @Column(columnDefinition = "TEXT")
  private String description;

  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String name;

  @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
  @JsonIgnore
  private List<ActivityEntity> activities;
  
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  protected Set<CategoryTranslatablesEntity> translatables;
  
  @Override
  public List<Link> createResourceLinks() {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(CategoryController.class)
        .readOne(id)).withSelfRel());
    links.add(linkTo(methodOn(CategoryController.class)
        .readTranslations(id)).withRel("translations"));

    return links;
  }

}
