import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task(); //obj 
  taskArr : Task[] = []; //array for storing task from user

  addTaskValue : string = ''; //user given value
  editTaskValue : string =''; //for edit task

  constructor(private crudService : CrudService){}
  

// has all crud methods for tasks i.e show, add, edit, del

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task(); //new obj 
    this.taskArr = [];
    this.getAllTask();
    
  }

  //show all tasks
  getAllTask() {
    this.crudService.getAllTask().subscribe (res => {
    this.taskArr = res;
    }, err =>{
      alert("unable to get the list");
    })
  }

  //add task
  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe (res => {
    this.ngOnInit();
    this.addTaskValue = '';
    }, err => {
    alert(err); //alert for error
    })
  }

  //edit task
  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe (res => {
    this.ngOnInit();
    this.editTaskValue = '';
    }, err =>{
      alert("failed to update task");
    })
  }
  
  // delete task
  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe (res =>{
      this.ngOnInit();
    }, err =>{
      alert("failed to delete task");
    })
  }

  call(etask : Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
