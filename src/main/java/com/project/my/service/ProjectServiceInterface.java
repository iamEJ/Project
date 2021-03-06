package com.project.my.service;

import java.util.List;
import java.util.Optional;

import com.project.my.model.Project;
import com.project.my.model.Task;

public interface ProjectServiceInterface {

	Optional<Project> getProjetc(Long id);

	List<Project> getProjects();

	void createProject(Project projectData);

	void updateProject(Long id, Project newProject);

	void deleteProjectById(Long id);
	
	Project findByProjectTitle(String projectTitle);
	
	public void createTaskByProjectId(Long id, Task task);

	void createTaskAndAssignToProject(Task task, Long id);

}