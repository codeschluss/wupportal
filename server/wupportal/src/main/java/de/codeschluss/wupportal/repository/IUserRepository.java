package de.codeschluss.wupportal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.wupportal.model.User;

public interface IUserRepository extends JpaRepository<User, String>{

	User findByUsername(String userName);

}
