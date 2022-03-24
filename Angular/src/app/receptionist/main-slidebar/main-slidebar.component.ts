import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../receptionist.service';

@Component({
  selector: 'pm-main-slidebar',
  templateUrl: './main-slidebar.component.html',
  styleUrls: ['./main-slidebar.component.css', '../../../../dist/css/adminlte.min.css']
})
export class MainSlidebarComponent implements OnInit {

  
  constructor(public recSrv: ReceptionistService) {
  }

  ngOnInit(): void {
    
  }

  showApp(){
    this.recSrv.showAppointment = !this.recSrv.showAppointment
  }


}
