package de.codeschluss.wupportal.security;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import de.codeschluss.wupportal.provider.ProviderEntity;
import de.codeschluss.wupportal.provider.ProviderService;
import de.codeschluss.wupportal.user.UserEntity;
import de.codeschluss.wupportal.user.UserService;

@Component
public class JWTUserDetailService implements UserDetailsService {

	private UserService userService;
	private ProviderService providerService;

	public JWTUserDetailService(UserService service, ProviderService providerService, HttpServletRequest request) {
		this.userService = service;
		this.providerService = providerService;
	}

	@Override
	public JWTUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = this.userService.getUser(username);
		String[] approvedProviderIds = getApprovedProviders(user);
		String[] orgaAdminIds = getOrgaAdminProviders(user);
		return new JWTUserDetails(user, approvedProviderIds, orgaAdminIds);
	}

	private String[] getApprovedProviders(UserEntity user) {
		List<ProviderEntity> providers = this.providerService.getApprovedProviders(user);
		
		return providers == null || providers.isEmpty()
				? new String[0]
				: (String[]) providers.stream().map(provider -> provider.getId()).toArray(String[]::new);
	}
	
	private String[] getOrgaAdminProviders(UserEntity user) {
		List<ProviderEntity> providers = this.providerService.getOrgaAdminProviders(user);
		
		return providers == null || providers.isEmpty()
				? new String[0]
				: (String[]) providers.stream().map(provider -> provider.getOrganisation().getId()).toArray(String[]::new);
	}

}