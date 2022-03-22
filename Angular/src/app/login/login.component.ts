import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string="RandaHadad";
  password:string="123";

  constructor(public authser:AuthServiceService,public router:Router) { }

  ngOnInit(): void {
  }

  login()
  {
    console.log(this.userName);
    this.authser.login(this.userName,this.password)
    .subscribe((data:any)=>
    {
      if(data.message==="Logged doc")
      {
        this.authser.isLogged=true;
        this.router.navigateByUrl("/doctor");
      }
      else if(data.message==="Logged rec")
      {
        this.authser.isLogged=true;
        this.router.navigateByUrl("/receptionist");
      }
    });
  }

}
