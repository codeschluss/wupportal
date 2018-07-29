package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.TargetGroup;

@RepositoryRestResource(collectionResourceRel = "targetGroups", path = "targetGroups")
public interface ITargetGroupRepository extends JpaRepository<TargetGroup, String>{

}
