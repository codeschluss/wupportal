package de.codeschluss.wupportal.provider;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
public class ProviderTO {
	
	private String userId;
	private String organisationId;

}
