package com.project.my.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;



@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames={"projectTitle"})})
public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Column(unique=true)
	private String projectTitle;
	@NotNull
	private String description;
	
	@Enumerated(EnumType.STRING)
	private Status status; 
	
	 @OneToMany(cascade = CascadeType.ALL,
	            fetch = FetchType.LAZY,
	            mappedBy = "project")
	private List<Task> allTasks = new ArrayList<>() ;
	 
	 @OneToMany(targetEntity=Task.class, mappedBy="project", fetch=FetchType.EAGER)
	private List<Task> completeTasks;
	
	
	public Project() {}
	
	public Project(String projectTitle, String description) {
		this.projectTitle = projectTitle;
		this.description = description;
	
	}
	
	
	public Project(String projectTitle, String description, Status status) {
		this.projectTitle = projectTitle;
		this.description = description;
		this.status = status;
	}
	
	


	public Project(@NotNull String projectTitle, @NotNull String description, @NotNull Status status,
			List<Task> allTasks, List<Task> completeTasks) {
		super();
		this.projectTitle = projectTitle;
		this.description = description;
		this.status = status;
		this.allTasks = allTasks;
		this.completeTasks = completeTasks;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getProjectTitle() {
		return projectTitle;
	}


	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Status getStatus() {
		return status;
	}


	public void setStatus(Status status) {
		

		this.status = status;
	}


	public int  getAllTasks() {
		return allTasks.size();
	}
	


	public void setAllTasks(List<Task> allTasks) {
		this.allTasks = allTasks;
	}
	
	 public void addTask(Task task){
	        task.setProjectName(this.getProjectTitle());
	        allTasks.add(task);
	        task.setProject(this);
	    }


	public int getCompleteTasks() {
		
		List<Task> ta = new ArrayList<>();
		
		for(Task t : allTasks) {
			if(t.getStatus() == Status.done) {
				ta.add(t);
			}
		}
		
		return ta.size();
	}


	public void setCompleteTasks(List<Task> completeTasks) {
		this.completeTasks = completeTasks;
	}
	
	
	
	
	
	
	

}
