package de.codeschluss.portal.functional.user;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.hateoas.core.Relation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import de.codeschluss.portal.common.base.BaseEntity;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;

/**
 * The persistent class for the users database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "users")
@Relation(collectionRelation = "data")
public class UserEntity extends BaseEntity {
	
	private static final long serialVersionUID = 1L;

	private String fullname;

	private String password;

	private String phone;

	private boolean superuser;

	private String username;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	@ToString.Exclude
	private List<ProviderEntity> providerEntities;
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}
	
	@JsonIgnore
	public boolean isSuperuser() {
		return this.superuser;
	}
	
	@JsonProperty
	public void setSuperuser(boolean superuser) {
		this.superuser = superuser;
	}
	
}