package de.codeschluss.wupportal.model;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@MappedSuperclass
public abstract class BaseEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	protected String id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	protected Date modified;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	protected Date created;
	
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getCreated() {
		return this.created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}
	
	public Date getModified() {
		return this.modified;
	}

	public void setModified(Date modified) {
		this.modified = modified;
	}

}
