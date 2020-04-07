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
import com.project.my.service.ProjectService;



@RestController
@RequestMapping(path = "api/projects")
public class ProjectController {
	
	private ProjectService projectService;

	@Autowired
	public ProjectController(ProjectService prpjectService) {
		this.projectService = prpjectService;
	}
	
	@GetMapping
	public List<Project> getProjects(){
		return projectService.getProjects();
	}
	
	 @GetMapping("/{id}")
	 	public Optional<Project> getProject(@PathVariable Long id) {
		return projectService.getProjetc(id);
	}
	
	@PostMapping
	public Project createProject(@RequestBody Project projectData) {
		return projectService.createProject(projectData);
	}
	
	@PutMapping("/{id}")
	public Project updateProject(@RequestBody Project newProject, @PathVariable Long id) {
		return projectService.updateProject(id, newProject);
	}
	
	@DeleteMapping("/{id}")
	public void deleteProject(@PathVariable Long id) {
		projectService.deleteProjectById(id);
	}

}
