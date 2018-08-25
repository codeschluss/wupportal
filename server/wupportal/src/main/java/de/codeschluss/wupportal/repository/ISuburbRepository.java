package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.wupportal.model.Suburb;

public interface ISuburbRepository extends JpaRepository<Suburb, String> {

}
