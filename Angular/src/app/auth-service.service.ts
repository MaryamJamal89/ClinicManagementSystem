import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLogged:boolean=false;
  login(userName:string,password:string)
  {
    console.log(userName,password);
    return this.http.post("http://localhost:8080/login",{"userName":userName, "password":password})
  }
  constructor(public http:HttpClient) { }
}
