package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import de.codeschluss.wupportal.activity.ActivityEntity;
import de.codeschluss.wupportal.base.BaseEntity;

/**
 * The persistent class for the schedules database table.
 * 
 */
@Entity
@Table(name = "schedules")
public class Schedule extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManyToOne
	private ActivityEntity activity;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "end_date")
	private Date endDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "start_date")
	private Date startDate;

}