import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'pm-doctor-header-sideform',
  templateUrl: './doctor-header-sideform.component.html',
  styleUrls: ['./doctor-header-sideform.component.css', '../../../assets/css/adminlte.min.css']
})
export class DoctorHeaderSideformComponent implements OnInit {

  constructor(private cookieService:CookieService,private router: Router) { }

  ngOnInit(): void {
  }

  
  deleteCookie(){
    this.cookieService.delete('ID')
    console.log("Cookie is deleted")
    this.router.navigate(['/login'])
  }
}
