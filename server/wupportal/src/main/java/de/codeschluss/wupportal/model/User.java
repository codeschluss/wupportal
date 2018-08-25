package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The persistent class for the users database table.
 * 
 */
@Entity
@Table(name = "users")
public class User extends BaseEntity implements Serializable {
	
	public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	private static final long serialVersionUID = 1L;

	private String fullname;

	private String password;

	private String phone;

	private boolean superuser;

	private String username;
	
	private String[] roles;

	@OneToMany(mappedBy = "user")
	private List<Provider> providers;

	public User() {
	}
	
	public String getFullname() {
		return this.fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = PASSWORD_ENCODER.encode(password);
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public boolean getSuperuser() {
		return this.superuser;
	}

	public void setSuperuser(boolean superuser) {
		this.superuser = superuser;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<Provider> getProviders() {
		return this.providers;
	}

	public void setProviders(List<Provider> providers) {
		this.providers = providers;
	}
	
	public String[] getRoles() {
		return roles;
	}

	public void setRoles(String[] roles) {
		this.roles = roles;
	}

}