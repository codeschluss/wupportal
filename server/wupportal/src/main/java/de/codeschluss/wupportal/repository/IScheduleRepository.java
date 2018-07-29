package de.codeschluss.wupportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Schedule;

@RepositoryRestResource(collectionResourceRel = "schedules", path = "schedules")
public interface IScheduleRepository extends JpaRepository<Schedule, String> {

}
