package de.codeschluss.portal.functional.configuration;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;

@Service
public class ConfigurationService extends DataService<ConfigurationEntity, ConfigurationRepository>{

	public ConfigurationService(ConfigurationRepository repo,
			ConfigurationResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public ConfigurationEntity getDuplicate(ConfigurationEntity newConfiguration) {
		return repo.findByItem(newConfiguration.getItem()).orElse(null);
	}

	@Override
	public ConfigurationEntity update(String id, ConfigurationEntity newConfiguration) {
		return repo.findById(id).map(category -> {
			category.setItem(newConfiguration.getItem());
			category.setValue(newConfiguration.getValue());
			return repo.save(category);
		}).orElseGet(() -> {
			newConfiguration.setId(id);
			return repo.save(newConfiguration);
		});
	}

	
}
