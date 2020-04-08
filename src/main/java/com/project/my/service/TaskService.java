package com.project.my.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.my.model.Project;
import com.project.my.model.Task;
import com.project.my.repository.ProjectRepository;
import com.project.my.repository.TaskRepository;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskRepo;
	


	
	public TaskService(TaskRepository taskRepo) {

		this.taskRepo = taskRepo;
	}
	
	public Optional<Task> getTask(Long id) {
		
		return taskRepo.findById(id);
	}
	
	public List<Task> getTasks() {
        return (List<Task>)taskRepo.findAll();
    }
	
	public void createTask(Task task) {
		Task newTask = new Task(task.getTaskName(),task.getDescription(), task.getPriority(),
				task.getStatus(),task.getProject());
		
		 taskRepo.save(newTask);
	}
	
	public void updateTask(Long id, Task task) {
		if(taskRepo.findById(id).isPresent()) {
			Task newtask = taskRepo.findById(id).get();
			newtask.setTaskName(task.getTaskName());
			newtask.setDescription(task.getDescription());
			newtask.setPriority(task.getPriority());
			newtask.setStatus(task.getStatus());
			newtask.setProject(task.getProject());	
					
		
			
			 taskRepo.save(newtask);
		}
	}
	
	public void deleteTaskById(Long id) {
		taskRepo.deleteById(id);
	}

//	public List<Task> getTasksByProjectID(Long id) {
//		// TODO Auto-generated method stub
//		return taskRepo.findByProjectId(id);
//	}

}
