package com.project.my.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.my.model.Project;

import com.project.my.model.Task;
import com.project.my.service.TaskServiceInterface;

@RestController
@RequestMapping(path = "api/tasks")
public class TaskConroller {
	
	@Autowired
	private TaskServiceInterface taskService;
	

	@GetMapping
	public List<Task> getTasks() {
		return taskService.getTasks();
	}

	//@GetMapping("project/{projectTitle}/tasks/{id}")
	@GetMapping("/{id}")
	public Optional<Task> getProject(@PathVariable Long id) {
		return taskService.getTask(id);
	}

	@PostMapping
	public void createProject(@RequestBody Task task) {
		 taskService.createTask(task);
	}

	@PutMapping("/{id}")
	public void updateProject(@RequestBody Task newTask, @PathVariable Long id) {
		taskService.updateTask(id, newTask);
	}

	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskService.deleteTaskById(id);
	}

}
