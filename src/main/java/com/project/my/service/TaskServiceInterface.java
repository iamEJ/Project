package com.project.my.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.project.my.model.Task;

public interface TaskServiceInterface {

	Optional<Task> getTask(Long id);

	List<Task> getTasks();

	void createTask(Task task);

	void updateTask(Long id, Task task);

	void deleteTaskById(Long id);
	
	List<Task> findByProjectId(Long id);

	Task findByTaskName( String taskName);

	Task findTaskById(Long id);

	

}