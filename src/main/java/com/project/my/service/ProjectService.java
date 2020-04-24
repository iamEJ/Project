package com.project.my.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.my.model.Project;
import com.project.my.model.Task;
import com.project.my.repository.ProjectRepository;
import com.project.my.repository.TaskRepository;

import javassist.NotFoundException;

@Service
public class ProjectService implements ProjectServiceInterface {
	@Autowired
	private ProjectRepository projectRepo;
	
	@Autowired
	private TaskRepository taskRepo;

	
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
		
		 projectRepo.save(projectData);
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
	
	
	// find by project title
	
	public Project findByProjectTitle(String title) {
		return projectRepo.findByProjectTitleIgnoreCase(title);
	}
	
	//find project by id and create task
	public void createTaskByProjectId(Long id, Task task) {
		
		Optional<Project> opproject = projectRepo.findById(id);
		
		if(opproject.isPresent()) {
			Project project = opproject.get();
			
			task.setProject(project);
			taskRepo.save(task);
		}
				
	}
	
	@Override
	public void createTaskAndAssignToProject(Task task, Long id)  {
	    Optional<Project> p =projectRepo.findById(id);
	    Project project = p.get();
	    project.addTask(task);
	    projectRepo.save(project);
	}

}
