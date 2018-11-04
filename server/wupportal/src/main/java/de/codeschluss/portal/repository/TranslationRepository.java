package de.codeschluss.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.portal.model.Translation;

public interface TranslationRepository extends JpaRepository<Translation, String> {

}
