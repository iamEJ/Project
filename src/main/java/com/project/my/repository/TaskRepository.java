package com.project.my.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.project.my.model.Project;
import com.project.my.model.Task;

public interface TaskRepository extends CrudRepository<Task, Long>{
	List<Task> findByProjectId(Long id);
	Task findByTaskNameIgnoreCase(String taskName);

}
