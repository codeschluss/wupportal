package de.codeschluss.wupportal.security;

import java.util.Collections;

import org.springframework.security.core.userdetails.User;

import de.codeschluss.wupportal.user.UserEntity;

public class JWTUserDetails extends User {
	
	private UserEntity user;
	private String[] providersIdList;
	private String[] orgaAdminIdList;
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public JWTUserDetails(UserEntity user, String[] providersIdList, String[] orgaAdminIdList) {
		super(user.getUsername(), user.getPassword(), Collections.emptyList());
		this.user = user;
		this.providersIdList = providersIdList;
		this.orgaAdminIdList = orgaAdminIdList;
	}
	
	public boolean isSuperUser() {
		return this.user.isSuperuser();
	}
	
	public String[] getApprovedProviders() {
		return this.providersIdList;
	}

	public String[] getOrgasWhereAdmin() {
		return this.orgaAdminIdList;
	}
}
