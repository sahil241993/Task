import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {tokenNotExpired} from 'angular2-jwt'
import {ResponseContentType} from '@angular/http'
@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  constructor(private http:Http) { }


loggedIn()
{
  return tokenNotExpired(null,this.authToken)
}

changeTask(task,user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:8080/users/task",{task:task,user:user},{headers:headers})
    .map(res=>res.json());  
  }

  registerUser(user){
    console.log(user)
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://127.0.0.1:8080/users/register",user,{headers:headers})
    .map(res=>res.json());  
  }

  authenticateUser(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:8080/users/authenticate",user,{headers:headers})
    .map(res =>res.json())  
}

getProfile(){
   let headers=new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    console.log(this.authToken)
    headers.append('Authorization',this.authToken);
    return this.http.get("http://localhost:8080/users/profile",
    {headers:headers})
    .map(res =>res.json()) 
}

loadToken(){
  const token=localStorage.getItem('id_token');
  this.authToken=token;
}
storeUserData(token,user){
  console.log("user is ",user)
  localStorage.setItem('id_token',token);
  localStorage.setItem('user',JSON.stringify(user));
  this.authToken=token;
  this.user=user;
}
logoutUser(){
  localStorage.clear();
 this.authToken=null; 
 this.user=null;
}
}