package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Organisation;

@RepositoryRestResource(collectionResourceRel = "organisations", path = "organisations")
public interface IOrganisationRepository extends JpaRepository<Organisation, String>{

}
