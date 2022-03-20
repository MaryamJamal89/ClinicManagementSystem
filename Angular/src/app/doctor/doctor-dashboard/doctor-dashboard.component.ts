import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from '../../../../node_modules/chart.js'
Chart.register(...registerables);
import { Appointment } from 'src/app/_models/appointment';
import { DoctorService } from '../../doctor.service';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; //< import. it
import { EventInput } from '@fullcalendar/angular';

@Component({
  selector: 'pm-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  newAppointment: Appointment = new Appointment("0","0","0",new Date(),1,"Cash",1000,"x");
  calendarPlugins = [dayGridPlugin]; // important!
  INITIAL_EVENTS: EventInput[] = [];
  
  constructor(private docSrv: DoctorService){ }
  
  ngOnInit(): void { 
    this.appointments=this.docSrv.getAllAppointments();
    for (let i = 0; i < this.appointments.length; i++) {
      this.INITIAL_EVENTS.push({
        title: this.appointments[i].serviceName,
        start: this.appointments[i].appDate
      })
    }
  }
  
  //TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter Service name');
    const paymentMethod = prompt('Please enter paymentMethod');
    let s = prompt('Please enter Fees')||0 ;
    let fees:number = +s ;
    
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title&&paymentMethod&&fees) 
    
    {
      // this.newAppointment.serviceName=title
      calendarApi.addEvent(
        
        {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      this.docSrv.addAppointment(new Appointment("0","0","0",new Date(selectInfo.startStr),1,paymentMethod,fees,title));
      this.appointments.forEach(element => {
        console.log(element)
      });
      
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  
}
