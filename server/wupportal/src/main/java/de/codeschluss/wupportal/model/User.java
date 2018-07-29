package de.codeschluss.wupportal.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

/**
 * The persistent class for the users database table.
 * 
 */
@Entity
@Table(name = "users")
public class User extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String fullname;

	private String password;

	private String phone;

	private byte superuser;

	private String username;

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
	
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public byte getSuperuser() {
		return this.superuser;
	}

	public void setSuperuser(byte superuser) {
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

}