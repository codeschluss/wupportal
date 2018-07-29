package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Address;

@RepositoryRestResource(collectionResourceRel = "address", path = "address")
public interface IAddressRepository extends JpaRepository<Address, String> {
	

}
