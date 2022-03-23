import { Component, OnInit } from '@angular/core';
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

  constructor(public authser:AuthServiceService,public router:Router) { }

  ngOnInit(): void {
    this.authser.isLogged=false;
  }

  login()
  {
    this.token=localStorage.getItem('token');
    this.authser.login(this.userName,this.password)
    .subscribe((data:any)=>
    {
      if(data.message==="Doctor")
      {
        this.authser.isLogged=true;
        localStorage.setItem('token',data.token);
        this.router.navigateByUrl("/doctor");
      }
      else if(data.message==="Rescptionist")
      {
        this.authser.isLogged=true;
        localStorage.setItem('token',data.token);
        this.router.navigateByUrl("/receptionist");
      }
    });
  }

}
