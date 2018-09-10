package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.wupportal.model.Tag;

public interface TagRepository extends JpaRepository<Tag, String> {

}
