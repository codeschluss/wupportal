package de.codeschluss.portal.core.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

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
@Data
public abstract class BaseEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @Column(columnDefinition = "CHAR")
  @JsonProperty(access = Access.READ_ONLY)
  protected String id;

  @Temporal(TemporalType.TIMESTAMP)
  @LastModifiedDate
  @Column(
      nullable = false, 
      columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
      insertable = false, 
      updatable = false)
  @JsonProperty(access = Access.READ_ONLY)
  protected Date modified;

  @Temporal(TemporalType.TIMESTAMP)
  @CreatedDate
  @Column(
      nullable = false, 
      columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
      insertable = false, 
      updatable = false)
  @JsonProperty(access = Access.READ_ONLY)
  protected Date created;

  public BaseEntity() {
    this.id = UUID.randomUUID().toString();
  }
}
