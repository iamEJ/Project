package com.project.my.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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
@RequestMapping(path = "api")
public class TaskConroller {
	
	@Autowired
	private TaskServiceInterface taskService;
	

	@GetMapping("/tasks")
	public List<Task> getTasks() {
		return taskService.getTasks();
	}		
	
	@GetMapping("/tasks/{id}")
	public Optional<Task> getProject(@Valid @PathVariable Long id) {
		return taskService.getTask(id);
	}
	
	 @GetMapping("/tasks/taskName/{taskName}")
	 public Task findByTaskName(@Valid @PathVariable String taskName) {
		return taskService.findByTaskName(taskName);
	 }
	


	@PostMapping("/tasks")
	public void createProject(@Valid @RequestBody Task task) {
		 taskService.createTask(task);
	}

	@PutMapping("/tasks/{id}")
	public void updateProject(@Valid @RequestBody Task newTask, @PathVariable Long id) {
		taskService.updateTask(id, newTask);
	}

	@DeleteMapping("/tasks/{id}")
	public void deleteTask(@Valid @PathVariable Long id) {
		taskService.deleteTaskById(id);
	}

}
