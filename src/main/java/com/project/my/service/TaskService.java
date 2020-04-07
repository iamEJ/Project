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

	private TaskRepository taskRepo;
	private ProjectRepository projectRepo;


	@Autowired
	public TaskService(TaskRepository taskRepo) {

		this.taskRepo = taskRepo;
	}
	
	public Optional<Task> getTask(Long id) {
		
		return taskRepo.findById(id);
	}
	
	public List<Task> getTasks() {
        return taskRepo.findAll();
    }
	
	public Task createTask(Task task) {
		Task newTask = new Task(task.getTaskName(),task.getDescription(), task.getPriority(),
				task.getStatus());
		
		return taskRepo.save(newTask);
	}
	
	public Task updateTask(Long id, Task task) {
		if(taskRepo.findById(id).isPresent()) {
			Task newtask = taskRepo.findById(id).get();
			newtask.setTaskName(task.getTaskName());
			newtask.setDescription(task.getDescription());
			newtask.setPriority(task.getPriority());
			newtask.setStatus(task.getStatus());
		
			
			return taskRepo.save(newtask);
		}else {
			return null;
		}
	}
	
	public void deleteTaskById(Long id) {
		taskRepo.deleteById(id);
	}

//	public Set<Task> getTasksByProjectID(Long id) {
//		// TODO Auto-generated method stub
//		return taskRepo.findByProjetcId(id);
//	}

}
