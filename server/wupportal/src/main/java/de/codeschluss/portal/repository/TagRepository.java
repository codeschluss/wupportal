package de.codeschluss.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.portal.model.Tag;

public interface TagRepository extends JpaRepository<Tag, String> {

}
