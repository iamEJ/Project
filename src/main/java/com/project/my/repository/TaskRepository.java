package com.project.my.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.my.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{
	//List<Task> findByProjectId(Long id);

}
