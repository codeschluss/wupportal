package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Activity;

@RepositoryRestResource(collectionResourceRel = "activities", path = "activities")
public interface IActivityRepository extends JpaRepository<Activity, String> {

}
