package com.project.my.model;

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
import javax.persistence.ManyToOne;
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
	@NotNull
	@Enumerated(EnumType.STRING)
	private Status status; // can i make here an enum?
	
	 @OneToMany(cascade = CascadeType.ALL,
	            fetch = FetchType.LAZY,
	            mappedBy = "project")
	private Set<Task> allTasks;
	//private Set<Task> incompleteTasks = new HashSet<>();
	
	
	public Project() {}
	
	
	public Project(String projectTitle, String description, Status status) {
		this.projectTitle = projectTitle;
		this.description = description;
		this.status = status;
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


	public Set<Task> getAllTasks() {
		return allTasks;
	}


	public void setAllTasks(Set<Task> allTasks) {
		this.allTasks = allTasks;
	}
	
	
	
	
	
	
	
	
	

}
