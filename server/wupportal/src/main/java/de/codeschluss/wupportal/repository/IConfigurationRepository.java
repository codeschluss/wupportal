package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Configuration;

@RepositoryRestResource(collectionResourceRel = "configurations", path = "configurations")
public interface IConfigurationRepository extends JpaRepository<Configuration, String>{

}
