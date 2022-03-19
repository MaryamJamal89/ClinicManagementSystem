import { Component } from '@angular/core';
import * as $ from 'jquery'; // that's is the syntax for jquery
import { CalendarOptions, Calendar } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; //< import. it

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }
  ngOnInit() { }

  // calendarPlugins = [dayGridPlugin]; // important!

  // Events: any[] = [];
  // calendarOptions: CalendarOptions = {
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  //   },
  //   initialView: 'dayGridMonth',
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true
  // };
  // // constructor(private httpClient: HttpClient) {}
  // onDateClick(res: any) {
  //   alert('Clicked on date : ' + res.dateStr);
  // }
  // ngOnInit() {
  //   // setTimeout(() => {
  //   //   return this.httpClient
  //   //     .get('http://localhost:8888/event.php')
  //   //     .subscribe((res: any) => {
  //   //       this.Events.push(res);
  //   //       console.log(this.Events);
  //   //     });
  //   // }, 2200);
  //   setTimeout(() => {
  //     this.calendarOptions = {
  //       initialView: 'dayGridMonth',
  //       dateClick: this.onDateClick.bind(this),
  //       events: this.Events,
  //     };
  //   }, 2500);
  // }

}
