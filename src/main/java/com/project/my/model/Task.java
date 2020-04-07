package com.project.my.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private String taskName;
	@NotNull
	private String description; // user story format????
	@NotNull
	private Priority priority;
	@NotNull
	private Status status;
	
	@Column(updatable = false)
	@CreationTimestamp
	private Date startDate;
	@UpdateTimestamp
	private Date finishDate;
	
	@ManyToOne
    @JoinColumn(name="project_id", nullable=true)
	private Project project;

	public Task() {
	}

	public Task(String taskName, String description, Priority priority, Status status) {
		this.taskName = taskName;
		this.description = description;
		this.priority = priority;
		this.status = status;
	}
	
	

	public Task( String taskName,  String description, Priority priority,
			 Status status,  Project project) {
		super();
		this.taskName = taskName;
		this.description = description;
		this.priority = priority;
		this.status = status;
	
		this.project = project;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getFinishDate() {
		return finishDate;
	}

	public void setFishDate(Date fishDate) {
		this.finishDate = fishDate;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
	
	
	
	

}
