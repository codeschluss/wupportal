package de.codeschluss.portal.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.portal.model.Suburb;

public interface SuburbRepository extends JpaRepository<Suburb, String> {

}
