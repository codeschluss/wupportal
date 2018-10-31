package de.codeschluss.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.portal.model.Address;

public interface AddressRepository extends JpaRepository<Address, String> {
	

}
