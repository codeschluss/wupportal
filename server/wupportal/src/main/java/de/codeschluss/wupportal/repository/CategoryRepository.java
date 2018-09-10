package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.wupportal.model.Category;

public interface CategoryRepository extends JpaRepository<Category, String>{

}
