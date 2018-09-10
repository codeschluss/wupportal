package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.wupportal.model.Configuration;

public interface ConfigurationRepository extends JpaRepository<Configuration, String>{

}
