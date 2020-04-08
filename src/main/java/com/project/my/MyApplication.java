package com.project.my;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import com.project.my.model.Priority;
import com.project.my.model.Project;
import com.project.my.model.Status;
import com.project.my.model.Task;
import com.project.my.repository.ProjectRepository;
import com.project.my.repository.TaskRepository;


@SpringBootApplication
public class MyApplication implements CommandLineRunner
{
	@Autowired
	ProjectRepository ps;
	
	@Autowired
	TaskRepository ts;

	public static void main(String[] args) {
		SpringApplication.run(MyApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		Project project1 = new Project("Pink","This projetc is important. i guess. But i really wish i coul do it with you",Status.done);
		Project project2 = new Project("Green","This projetc is less important. i guess.",Status.todo);
		Project project3 = new Project("Red","This project is about computers.",Status.in_progress);
		
		ps.save(project1);
		ps.save(project2);
		ps.save(project3);
		
		Task task1 = new Task("Add pillows", "this to add pillows", Priority.hight,Status.in_progress,project1);
		Task task2 = new Task("Add cars", "this to add cars", Priority.low,Status.done,project2);
		Task task3 = new Task("Create dreams", "this creates dreams", Priority.hight,Status.todo,project1);
		Task task4 = new Task("Delete mind", "deletes mind", Priority.medium,Status.in_progress,project3);
		Task task5 = new Task("Set a list", "this to add to a set", Priority.low,Status.done,project2);
		
		ts.save(task1);
		ts.save(task2);
		ts.save(task3);
		ts.save(task4);
		ts.save(task5);
		
	}

}
