import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from '../../../../node_modules/chart.js'
Chart.register(...registerables);

import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; //< import. it

@Component({
  selector: 'pm-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  calendarPlugins = [dayGridPlugin]; // important!

  constructor(){ }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  
  ngOnInit(): void { }
  
}
