import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service'

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string="";
  password:string="";

  constructor(public authser:AuthServiceService) { }

  ngOnInit(): void {
  }

  login()
  {
    //console.log(this.userName);
    this.authser.login(this.userName,this.password)
    .subscribe((data)=>
    {
      console.log(data);
    });
  }

}
