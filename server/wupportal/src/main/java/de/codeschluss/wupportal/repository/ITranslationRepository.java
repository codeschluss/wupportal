package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Translation;

@RepositoryRestResource(collectionResourceRel = "translations", path = "translations")
public interface ITranslationRepository extends JpaRepository<Translation, String> {

}
