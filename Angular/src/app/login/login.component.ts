import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthServiceService } from '../auth-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validatingForm: FormGroup;

  constructor(public authser:AuthServiceService,public router:Router) {
    this.validatingForm = new FormGroup({
      required: new FormControl(null, Validators.required)
    });
  }

  get input() { return this.validatingForm.get('required'); }

  userName:string="";
  password:string="";
  token:any;

  ngOnInit(): void {
    this.authser.isLogged=false;
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
      }
      else if(data.massage==="Rescptionist")
      {
        this.authser.isLogged=true;
        localStorage.setItem('token',data.token);
        this.router.navigateByUrl("/receptionist");
      }
    });
  }

}
