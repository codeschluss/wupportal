package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Provider;

@RepositoryRestResource(collectionResourceRel = "providers", path = "providers")
public interface IProviderRepository extends JpaRepository<Provider, String>{

}
