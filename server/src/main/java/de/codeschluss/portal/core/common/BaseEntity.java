package de.codeschluss.portal.core.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * The Class BaseEntity.
 * 
 * @author Valmir Etemi
 *
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @Column(columnDefinition = "CHAR")
  protected String id;

  @Temporal(TemporalType.TIMESTAMP)
  @LastModifiedDate
  @Column(nullable = false, columnDefinition = "default 'NOW()'")
  protected Date modified;

  @Temporal(TemporalType.TIMESTAMP)
  @CreatedDate
  @Column(nullable = false, columnDefinition = "default 'NOW()'")
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

  @JsonSerialize
  public Date getCreated() {
    return this.created;
  }

  @JsonIgnore
  public void setCreated(Date created) {
    this.created = created;
  }

  @JsonSerialize
  public Date getModified() {
    return this.modified;
  }

  @JsonIgnore
  public void setModified(Date modified) {
    this.modified = modified;
  }

}
