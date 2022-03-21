import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from '../../../../node_modules/chart.js'
Chart.register(...registerables);
import { Appointment } from 'src/app/_models/appointment';
import { DoctorService } from '../../doctor.service';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; //< import. it
import { EventInput } from '@fullcalendar/angular';
import { arrow } from '@popperjs/core';
import { Service } from '../../_models/service';


@Component({
  selector: 'pm-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  newAppointment: Appointment = new Appointment("62345f2086e4b9494d6237a4", "6235f4d9571875cdd3317bb4", new Date(), new Date(), "cash", 1000, new Service("x",0));
  calendarPlugins = [dayGridPlugin]; // important!
  //INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {}
  currentEvents: EventApi[] = [];
  arr:any =[];
  constructor(private docSrv: DoctorService) { }
  
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.docSrv.getAllAppointments().subscribe({
      next: a => {
        this.appointments = a;
        for (let i = 0; i < this.appointments.length; i++) {
          this.arr.push({
            title:this.appointments[i].service.name,
            date:this.appointments[i].startDate,
            end:this.appointments[i].endDate,
          })}
        setTimeout(()=>{
          this.calendarOptions = {
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            initialView: 'dayGridMonth',
            //initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
            weekends: true,
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            select: this.handleDateSelect.bind(this),
            eventClick: this.handleEventClick.bind(this),
            eventsSet: this.handleEvents.bind(this),
            events:this.arr, 
            // [
            //   {
            //     title:this.appointments[0].service.name,
            //   start: this.appointments[0].date,
            //  }
            // ],
            /* you can update a remote database when these fire:
            eventAdd:
            eventChange:
            eventRemove:
            */
          };
        }
        )
        
        console.log(this.appointments)
      }
    })
  }

  //TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title =this.newAppointment.service.name;
    // const paymentMethod = prompt('Please enter paymentMethod');
    // let s = prompt('Please enter Fees') || 0;
    // let fees: number = +s;

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // this.newAppointment.serviceName=title
      calendarApi.addEvent(

        {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });
        this.newAppointment.service.name = title 
        this.newAppointment.startDate =  new Date(selectInfo.start)
        this.newAppointment.endDate =  new Date(selectInfo.end)
        
        this.docSrv.addAppointment(this.newAppointment).subscribe({
          next:a=>{this.newAppointment=a}
        })
      //this.docSrv.addAppointment(new Appointment("0","0", "0", new Date(selectInfo.startStr), 1, paymentMethod, fees, title));
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

  //?-------------------------------Add Appointment--------------------------------?//
  // addDepartment(){
  //   this.stdSer.add(this.newDepartment).subscribe({
  //     next:a=>{this.newDepartment=a}
  //   })
  //   this.router.navigate(["./department"])
  // }
  
}
