import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookieService:CookieService,private router: Router) { }

  ngOnInit(): void {
  }

  deleteCookie(){
    this.cookieService.delete('ID')
    console.log("Cookie is deleted")
    this.router.navigate(['/login'])
  }
}
