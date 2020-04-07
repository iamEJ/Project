package com.project.my.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.my.model.Project;

import com.project.my.repository.ProjectRepository;

@Service
public class ProjectService {
	
	private ProjectRepository projectRepo;

	@Autowired
	public ProjectService(ProjectRepository projectRepo) {
		this.projectRepo = projectRepo;
	}
	
	public Optional<Project> getProjetc(Long id) {
	
		return projectRepo.findById(id);
	}
	
	public List<Project> getProjects() {
        return projectRepo.findAll();
    }
	
	public Project createProject(Project projectData) {
		Project project = new Project(projectData.getProjectTitle(),
									  projectData.getDescription(),
									  projectData.getStatus());
		
		return projectRepo.save(project);
	}
	
	
	public Project updateProject(Long id, Project newProject) {
		if(projectRepo.findById(id).isPresent()) {
			Project project = projectRepo.findById(id).get();
			project.setProjectTitle(newProject.getProjectTitle());
			project.setDescription(newProject.getDescription());
			project.setStatus(newProject.getStatus());
			
			return projectRepo.save(project);
		}else {
			return null;
		}
	}
	
	public void deleteProjectById(Long id) {
		projectRepo.deleteById(id);
	}

}
