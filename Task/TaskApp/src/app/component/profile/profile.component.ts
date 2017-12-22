import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {DataService} from '../../services/data.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
@import url('http://fonts.googleapis.com/css?family=Raleway:300,700');
body{
    background:#2E9CE6;
    padding:3em;
}
  `]
})
export class ProfileComponent implements OnInit {
  user:Object;
  tasks=[];
  taskText='';
  taskCount:number;
  constructor(
    private authservice:AuthService,
    private router:Router,
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(data=>{
      this.user=data.user;
      this.tasks=data.user.task;
    },
    err=>{
      console.log(err);
      return false;
    }
    )
this.taskCount=this.tasks.length;
  }

addItem()
{
  if(this.taskText.length){  this.tasks.push(this.taskText);
  this.authservice.changeTask(this.taskText,this.user).subscribe(data=>{
      console.log(data.task)
      this.tasks=data.task;
    },
    err=>{
      console.log(err);
      return false;
    });
  this.taskText = '';
}
}
}
