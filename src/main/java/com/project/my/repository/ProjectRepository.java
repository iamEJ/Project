package com.project.my.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.project.my.model.Project;

public interface ProjectRepository extends CrudRepository<Project, Long> {

}
