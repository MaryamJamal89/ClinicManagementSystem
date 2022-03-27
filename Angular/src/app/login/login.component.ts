import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import { AuthServiceService } from '../auth-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string="";
  password:string="";
  token:any;
  private cookieName="";
  constructor(public authser:AuthServiceService,public router:Router, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.authser.isLogged=false;
  }

  setCookie(_id:string){
    this.cookieService.set('ID',_id)
  }
  login()
  {
    this.authser.login(this.userName,this.password)
    .subscribe((data:any)=>
    {
      console.log(data);
      if(data.massage==="Doctor")
      {
        this.authser.isLogged=true;
        localStorage.setItem('token',data.token);
        this.router.navigateByUrl("/doctor");
        this.setCookie(data.id)
      }
      else if(data.massage==="Rescptionist")
      {
        this.authser.isLogged=true;
        localStorage.setItem('token',data.token);
        this.router.navigateByUrl("/receptionist");
        this.setCookie(data.id)
      }else{
        alert("Please enter a valid data")
      }
    }

    );
  }

}
