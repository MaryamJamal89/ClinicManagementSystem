import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Receptionist } from 'src/app/_models/receptionist';
import { ReceptionistService } from '../../receptionist.service';

@Component({
  selector: 'pm-main-slidebar',
  templateUrl: './main-slidebar.component.html',
  styleUrls: ['./main-slidebar.component.css', '../../../assets/css/adminlte.min.css']
})
export class MainSlidebarComponent implements OnInit {

  cookieTemp="";
  cookieRecep:Receptionist = new Receptionist("","","","")
  constructor(public recSrv: ReceptionistService,private cookieService:CookieService) {
  }

  ngOnInit(): void {
    this.cookieTemp= this.cookieService.get("ID")
    this.getRecep(this.cookieTemp)
  }

  showApp(){
    this.recSrv.showAppointment = !this.recSrv.showAppointment
  }

  getRecep(id:string) {
    this.recSrv.getRecepByID(id).subscribe({
      next: a => {
        this.cookieRecep = a;
        console.log(this.cookieRecep)
      }
    })
  }

}
