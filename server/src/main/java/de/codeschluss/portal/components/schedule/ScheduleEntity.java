package de.codeschluss.portal.components.schedule;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.core.common.BaseEntity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the schedules database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "schedules")
@Relation(collectionRelation = "data")
public class ScheduleEntity extends BaseEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  @ManyToOne
  @JsonIgnore
  private ActivityEntity activity;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "end_date")
  private Date endDate;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "start_date")
  private Date startDate;

}