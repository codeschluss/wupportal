package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Suburb;

@RepositoryRestResource(collectionResourceRel = "suburbs", path = "suburbs")
public interface ISuburbRepository extends JpaRepository<Suburb, String> {

}
