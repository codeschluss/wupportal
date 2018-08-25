package de.codeschluss.wupportal.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
	
	@Id
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
	
	public BaseEntity() {
		this.id = UUID.randomUUID().toString();
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
