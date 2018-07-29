package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Tag;

@RepositoryRestResource(collectionResourceRel = "tags", path = "tags")
public interface ITagRepository extends JpaRepository<Tag, String> {

}
