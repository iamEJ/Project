package com.project.my.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@NotNull
	private String projectTitle;
	@NotNull
	private String description;
	@NotNull
	private Status status; // can i make here an enum?
	
	@OneToMany(mappedBy = "project",cascade=CascadeType.ALL)
	private Set<Task> allTasks = new HashSet<>();
	//private Set<Task> incompleteTasks = new HashSet<>();
	
	
	public Project() {}
	
	
	public Project(String projectTitle, String description, Status status) {
		this.projectTitle = projectTitle;
		this.description = description;
		this.status = status;
	}


	public Long getId() {
		return Id;
	}


	public void setId(Long id) {
		Id = id;
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


	public Set<Task> getAllTasks() {
		return allTasks;
	}


	public void setAllTasks(Set<Task> allTasks) {
		this.allTasks = allTasks;
	}
	
	
	
	
	
	
	
	
	

}
