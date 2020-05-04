package com.project.my.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.my.model.Project;

import com.project.my.model.Task;
import com.project.my.service.TaskServiceInterface;

@RestController
@RequestMapping(path = "api")
@CrossOrigin(origins ="http://localhost:3000")
public class TaskConroller {
	
	@Autowired
	private TaskServiceInterface taskService;
	

	@GetMapping("/tasks")
	@ResponseStatus(HttpStatus.OK)
	public List<Task> getTasks() {
		return taskService.getTasks();
	}		
	
	@GetMapping("/tasks/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<Task> getProject(@Valid @PathVariable Long id) {
		return taskService.getTask(id);
	}
	
	 @GetMapping("/tasks/taskName/{taskName}")
	 @ResponseStatus(HttpStatus.OK)
	 public Task findByTaskName(@Valid @PathVariable String taskName) {
		return taskService.findByTaskName(taskName);
	 }
	


	@PostMapping("/tasks")
	@ResponseStatus(HttpStatus.CREATED)
	public void createProject(@Valid @RequestBody Task task) {
		 taskService.createTask(task);
	}

//	@PutMapping("/tasks/{id}")
//	@ResponseStatus(HttpStatus.OK)
//	public void updateProject(@Valid @RequestBody Task newTask, @PathVariable Long id) {
//		taskService.updateTask(id, newTask);
//	}

//	@DeleteMapping("/tasks/{id}")
//	@ResponseStatus(HttpStatus.NO_CONTENT)
//	public void deleteTask(@Valid @PathVariable Long id) {
//		taskService.deleteTaskById(id);
//	}

}
