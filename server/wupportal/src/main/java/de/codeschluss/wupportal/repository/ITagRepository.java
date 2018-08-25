package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.wupportal.model.Tag;

public interface ITagRepository extends JpaRepository<Tag, String> {

}
