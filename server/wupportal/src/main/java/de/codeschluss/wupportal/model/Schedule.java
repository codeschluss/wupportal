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
	private ActivityEntity activityEntity;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "end_date")
	private Date endDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "start_date")
	private Date startDate;

	public Schedule() {
		super();
	}

	public ActivityEntity getActivity() {
		return this.activityEntity;
	}

	public void setActivity(ActivityEntity activityEntity) {
		this.activityEntity = activityEntity;
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

}