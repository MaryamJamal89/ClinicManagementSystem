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
    console.log(`USER NAME ${this.userName}`);
    console.log(this.password);
    this.authser.login(this.userName,this.password)
    .subscribe((data:any)=>
    {
      console.log(data);
      if(data.message==="Logged doc")
      {
        this.authser.isLogged=true;
        this.router.navigateByUrl("/doctor");
      }
      else if(data.message==="Logged res")
      {
        this.authser.isLogged=true;
        this.router.navigateByUrl("/receptionist");
      }
    });
  }

}
