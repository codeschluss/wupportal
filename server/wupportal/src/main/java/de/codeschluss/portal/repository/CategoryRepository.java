package de.codeschluss.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.portal.model.Category;

public interface CategoryRepository extends JpaRepository<Category, String>{

}
