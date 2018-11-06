package de.codeschluss.portal.functional.translation;

import java.io.Serializable;

import javax.persistence.*;

import org.springframework.hateoas.core.Relation;

import de.codeschluss.portal.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the translations database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "translations")
@Relation(collectionRelation = "data")
public class TranslationEntity extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String locale;

	private String name;
}