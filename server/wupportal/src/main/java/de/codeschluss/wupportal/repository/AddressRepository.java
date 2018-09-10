package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.wupportal.model.Address;

public interface AddressRepository extends JpaRepository<Address, String> {
	

}
