package de.codeschluss.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.portal.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, String> {

}
