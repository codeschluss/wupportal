package de.codeschluss.portal.functional.category;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import de.codeschluss.portal.common.base.BaseEntity;
import de.codeschluss.portal.functional.activity.ActivityEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the categories database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class CategoryEntity extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String color;

	@Lob
	private String description;

	private String name;

	@OneToMany(mappedBy = "category")
	private List<ActivityEntity> activities;

}