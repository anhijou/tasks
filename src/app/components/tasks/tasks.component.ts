import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks!:Task[];
  taskss:Task[]=[];
  searchText='';
  
   
    constructor(private taskService:TaskService){}

    ngOnInit() {
        this.getTasks();
    }
    showForm=false;
    editForm=false;
    myTask :Task={
       
      'label':'',
      'completed':false
    }
    getTasks(){
      this.taskService.findAll().subscribe(tasks=>
        this.taskss=this.tasks=tasks)
    }
    deleteTask(id:number|undefined){
      
       this.taskService.deleteTask(id).subscribe(()=>{
        this.tasks=this.tasks.filter(tasks=>tasks.id!=id);
       }
       );
    }

  
    presistTask(task:Task){
      this.taskService.persist(task).subscribe(task => {
        this.resetTask();
        this.tasks= [task,...this.tasks];
        //this.resetTask();
        this.showForm=false;
      })
    }
    resetTask(){
      this.myTask={
        'label':'',
        'completed':false
      }
    }

    completed(task:Task){
      this.taskService.completed(task.id,task.completed).subscribe(()=>
      {
        task.completed = !task.completed

      })
    }
    editTask(task:Task){
      this.myTask = task;
      this.editForm=true;
      this.showForm=true;
    }
    updateTask(){
      this.taskService.updateTask(this.myTask).subscribe(task=>{
        this.resetTask();
        this.editForm=false;
        this.showForm=false;
      })
    }
     
    SearchTasks() {
      // this.taskss = this.tasks.filter(task => {
      //   task.label.toLowerCase().includes(this.searchText.toLowerCase())
      // });

      this.taskss =  this.tasks.filter(task =>
        task.label.toLowerCase().includes(this.searchText.toLowerCase())
       
      );
    }
}
