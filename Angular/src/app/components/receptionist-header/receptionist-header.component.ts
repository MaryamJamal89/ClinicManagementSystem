import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router"

@Component({
  selector: 'pm-receptionist-header',
  templateUrl: './receptionist-header.component.html',
  styleUrls: ['./receptionist-header.component.css', '../../../../dist/css/adminlte.min.css']
})
export class ReceptionistHeaderComponent implements OnInit {

  constructor(private cookieService:CookieService,private router: Router) { }

  ngOnInit(): void {
  }

  
  deleteCookie(){
    this.cookieService.delete('ID')
    console.log("Cookie is deleted")
    this.router.navigate(['/login'])
  }
}
