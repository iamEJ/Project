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
import com.project.my.service.ProjectServiceInterface;


@SpringBootApplication
public class MyApplication implements CommandLineRunner
{
	@Autowired
	ProjectRepository ps;
	
	@Autowired
	TaskRepository ts;
	
	@Autowired
	ProjectServiceInterface psi;

	public static void main(String[] args) {
		SpringApplication.run(MyApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		
		for (int i = 1; i < 10; i++) {
			Project p = new Project("Turn to naming guides"+i,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sagittis dui.");
			for (int j = 1; j < 2; j++) {
				p.addTask(new Task("Task  "+j+i, 
						
						"advantage of async and await for more readable " ,
						 Priority.low,
						Status.todo));
			}
			psi.createProject(p);
		}
		
//		Project project1 = new Project("Turn to naming guides","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed sagittis dui.");
//		Project project2 = new Project("Look at past project names","Nullam consectetur tortor at lorem sagittis cursus. Sed ac purus leo. Integer convallis laoreet lectus, vitae blandit metus. ");
//		Project project3 = new Project("Get inspiration from other places","Ut at suscipit odio, non pretium nisl. Mauris dictum lorem ante, at tincidunt erat pellentesque non. ");
//		
//		
//		
//		project1.addTask(new Task("Add pillows", "this to add pillows", Priority.hight,Status.in_progress)); 
//		project1.addTask(new Task("Add cars", "this to add cars", Priority.low,Status.done));
//		project2.addTask(new Task("Create dreams", "this creates dreams", Priority.hight,Status.todo));
//		project2.addTask(new Task("Delete mind", "deletes mind", Priority.medium,Status.in_progress));
//		project3.addTask(new Task("Set a list", "this to add to a set", Priority.low,Status.done));
//		
//
//		psi.createProject(project1);
//		psi.createProject(project2);
//		psi.createProject(project3);
	}

}
