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

  constructor(public authser:AuthServiceService,public router:Router) { }

  ngOnInit(): void {
  }

  login()
  {
    this.authser.login(this.userName,this.password)
    .subscribe((data:any)=>
    {
      if(data.message==="Rescptionist")
      {
        this.authser.isLogged=true;
        this.router.navigateByUrl("/doctor");
      }
      else if(data.message==="Rescptionist")
      {
        this.authser.isLogged=true;
        this.router.navigateByUrl("/receptionist");
      }
    });
  }

}
