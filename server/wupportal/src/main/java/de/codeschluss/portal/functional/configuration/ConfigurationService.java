package de.codeschluss.portal.functional.configuration;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class ConfigurationService extends DataService<ConfigurationEntity>{

	public ConfigurationService(ConfigurationRepository repo,
			ConfigurationResourceAssembler assembler) {
		super(repo, assembler);
	}

}
