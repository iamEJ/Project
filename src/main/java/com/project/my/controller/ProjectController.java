package com.project.my.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.project.my.model.Task;
import com.project.my.service.ProjectServiceInterface;
import com.project.my.service.TaskServiceInterface;





@RestController
@RequestMapping(path = "api/projects")
@CrossOrigin(origins ="http://localhost:3000")
public class ProjectController {
	@Autowired
	private ProjectServiceInterface projectService;

	@Autowired
	private TaskServiceInterface taskService;
	
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Project> getProjects(){
		return projectService.getProjects();
	}
	
	 @GetMapping("/{id}")
	 @ResponseStatus(HttpStatus.OK)
	 	public Optional<Project> getProject(@Valid @PathVariable Long id) {
		return projectService.getProjetc(id);
	}
	 
	 @GetMapping("/projectTitle/{projectTitle}")
	 @ResponseStatus(HttpStatus.OK)
	 public Project findByProjectName(@Valid @PathVariable String projectTitle) {
		return projectService.findByProjectTitle(projectTitle);
	 }
	 
//	@GetMapping("/{projectId}/tasks/{taskId}")	
//	public Task findTaskByProjectId(@PathVariable Long pid, @PathVariable Long tid) {
//		return null;
//	}
	 
	/// Find all tasks by project id 
	@GetMapping("/{id}/tasks")
	@ResponseStatus(HttpStatus.OK)
	public List<Task> getProjectsTask(@Valid @PathVariable Long id){
			return taskService.findByProjectId(id);
	}
	
	
	//Creating task in projects found by id
	@PostMapping("/{id}/tasks")
	@ResponseStatus(HttpStatus.CREATED)	
	public void createTaskByProjectId(@Valid @PathVariable Long id, @RequestBody Task task ) {
		projectService.createTaskByProjectId(id, task);
	}
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void createProject(@Valid @RequestBody Project projectData) {
		projectService.createProject(projectData);
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void updateProject(@Valid @RequestBody Project newProject, @PathVariable Long id) {
		projectService.updateProject(id, newProject);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteProject(@Valid @PathVariable Long id) {
		projectService.deleteProjectById(id);
	}
	
    @PutMapping("/assign/{id}")
    @CrossOrigin(origins ="http://localhost:3000")
    public void addTaskToProject(@PathVariable Long id ,@RequestBody  @Valid Task task){
    	projectService.createTaskAndAssignToProject(task, id);
    }

}
