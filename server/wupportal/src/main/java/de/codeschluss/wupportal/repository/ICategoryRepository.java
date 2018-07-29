package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Category;

@RepositoryRestResource(collectionResourceRel = "categories", path = "categories")
public interface ICategoryRepository extends JpaRepository<Category, String>{

}
