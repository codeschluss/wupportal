package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.User;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface IUserRepository extends JpaRepository<User, String>{

}
