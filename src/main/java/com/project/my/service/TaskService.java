package com.project.my.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.my.model.Project;
import com.project.my.model.Status;
import com.project.my.model.Task;

import com.project.my.repository.ProjectRepository;
import com.project.my.repository.TaskRepository;

@Service
public class TaskService implements TaskServiceInterface {
	
	@Autowired
	private TaskRepository taskRepo;
	
	@Autowired
	private ProjectRepository projectRepo;
	
	
	public TaskService(TaskRepository taskRepo) {

		this.taskRepo = taskRepo;
	}
	
	@Override
	public Optional<Task> getTask(Long id) {
		
		return taskRepo.findById(id);
	}
	
	@Override
	public List<Task> getTasks() {
        return (List<Task>)taskRepo.findAll();
    }
	
	@Override
	public void createTask(Task task) {
		Task newTask = new Task(task.getTaskName(),task.getDescription(), task.getPriority(),
				task.getStatus());
		
		 taskRepo.save(newTask);
	}
	
	@Override
	public void updateTask(Long id, Task task) {
		if(taskRepo.findById(id).isPresent()) {
			Task newtask = taskRepo.findById(id).get();
			newtask.setTaskName(task.getTaskName());
			newtask.setDescription(task.getDescription());
			newtask.setPriority(task.getPriority());
			
			newtask.setStatus(task.getStatus());
//			newtask.setProject(task.getProject());	
					
		
			
			 taskRepo.save(newtask);
		}
	}
	
	@Override
	public void deleteTaskById(Long id) {
		
		taskRepo.deleteById(id);
		
		
	}
	@Override
	public Task findTaskById(Long id) {
		return taskRepo.findById(id).orElse(null);
	}

	@Override
	public List<Task> findByProjectId(Long id) {
		
		return taskRepo.findByProjectId(id);
	}

	@Override
	public Task findByTaskName(String taskName) {
		// TODO Auto-generated method stub
		return taskRepo.findByTaskNameIgnoreCase(taskName);
	}






	


}
