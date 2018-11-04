package de.codeschluss.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.portal.model.Configuration;

public interface ConfigurationRepository extends JpaRepository<Configuration, String>{

}
