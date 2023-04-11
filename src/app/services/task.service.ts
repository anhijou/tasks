import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  private API = "http://localhost:3000/tasks";
  findAll(){
    return this.http.get<Task[]>(this.API);
  }

  deleteTask(id:number|undefined){
     const url = `${this.API}/${id}`;
      return this.http.delete(url);
  }

  persist(task:Task){
    
     return this.http.post<Task>(this.API,task);
 }

 completed(id:number|undefined,completed:any){
  const url = `${this.API}/${id}`;
  return this.http.patch(url,{completed: !completed});
 }

 updateTask(task:Task){
  const url = `${this.API}/${task.id}`;
  return this.http.put<Task>(url,task);
}


}
