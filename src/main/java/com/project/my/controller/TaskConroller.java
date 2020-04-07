package com.project.my.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import com.project.my.service.TaskService;

@RestController
@RequestMapping(path = "api/tasks")
public class TaskConroller {

	private TaskService taskService;

	@Autowired
	public TaskConroller(TaskService taskService) {
		this.taskService = taskService;
	}

	
	@GetMapping
	public List<Task> getTasks() {
		return taskService.getTasks();
	}
	
	//@GetMapping("project/{id}/tasks")
//	public Set<Task> getTasksByProjectId(@PathVariable Long id){
//		
//		return taskService.getTasksByProjectID(id);
//	}

	//@GetMapping("project/{id}/tasks/{id}")
	@GetMapping("/{id}")
	public Optional<Task> getProject(@PathVariable Long id) {
		return taskService.getTask(id);
	}

	@PostMapping
	public Task createProject(@RequestBody Task task) {
		return taskService.createTask(task);
	}

	@PutMapping("/{id}")
	public Task updateProject(@RequestBody Task newTask, @PathVariable Long id) {
		return taskService.updateTask(id, newTask);
	}

	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskService.deleteTaskById(id);
	}

}
