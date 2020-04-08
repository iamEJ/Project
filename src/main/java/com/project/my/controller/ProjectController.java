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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.project.my.model.Project;
import com.project.my.service.ProjectServiceInterface;



@RestController
@RequestMapping(path = "api/projects")
public class ProjectController {
	@Autowired
	private ProjectServiceInterface projectService;

	
	@GetMapping
	public List<Project> getProjects(){
		return projectService.getProjects();
	}
	
	 @GetMapping("/{id}")
	 	public Optional<Project> getProject(@PathVariable Long id) {
		return projectService.getProjetc(id);
	}
	
	@PostMapping
	public void createProject(@RequestBody Project projectData) {
		projectService.createProject(projectData);
	}
	
	@PutMapping("/{id}")
	public void updateProject(@RequestBody Project newProject, @PathVariable Long id) {
		projectService.updateProject(id, newProject);
	}
	
	@DeleteMapping("/{id}")
	public void deleteProject(@PathVariable Long id) {
		projectService.deleteProjectById(id);
	}

}
