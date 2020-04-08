package com.project.my.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.my.model.Project;
import com.project.my.repository.ProjectRepository;

@Service
public class ProjectService implements ProjectServiceInterface {
	@Autowired
	private ProjectRepository projectRepo;

	
	@Override
	public Optional<Project> getProjetc(Long id) {
	
		return projectRepo.findById(id);
	}
	
	@Override
	public List<Project> getProjects() {
        return (List<Project>)projectRepo.findAll();
    }
	
	@Override
	public void createProject(Project projectData) {
		Project project = new Project(projectData.getProjectTitle(),
									  projectData.getDescription(),
									  projectData.getStatus());
		
		 projectRepo.save(project);
	}
	
	
	@Override
	public void updateProject(Long id, Project newProject) {
		if(projectRepo.findById(id).isPresent()) {
			Project project = projectRepo.findById(id).get();
			project.setProjectTitle(newProject.getProjectTitle());
			project.setDescription(newProject.getDescription());
			project.setStatus(newProject.getStatus());
			
			projectRepo.save(project);
		}
	
	}
	
	@Override
	public void deleteProjectById(Long id) {
		projectRepo.deleteById(id);
	}
	

}
