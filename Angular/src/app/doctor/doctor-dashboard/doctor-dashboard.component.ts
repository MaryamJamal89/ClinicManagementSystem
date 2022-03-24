import { Component, ElementRef, OnInit, ViewChild,AfterViewInit, Inject, VERSION } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare let $: any;

import { Chart, registerables } from '../../../../node_modules/chart.js'
Chart.register(...registerables);

import { Appointment } from 'src/app/_models/appointment';
import { DoctorService } from '../../doctor.service';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; //< import. it

import { EventInput } from '@fullcalendar/angular';

import { arrow } from '@popperjs/core';

import { Service } from '../../_models/service';
import { DOCUMENT } from '@angular/common';
import { ReceptionistService } from '../../receptionist.service';
import { Patient } from '../../_models/patient';


@Component({
  selector: 'pm-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css', '../../../../dist/css/adminlte.min.css']
})
export class DoctorDashboardComponent implements OnInit  {
  contentFromHtml:any;
  constructor(private docSrv: DoctorService, private modalService: NgbModal,private docSrvP: ReceptionistService) {
  }

  // constructor(private modalService: NgbModal) { }  
  
  appointments: Appointment[] = [];
  newAppointment: Appointment = new Appointment("62345f2086e4b9494d6237a4", "", new Date(), new Date(), "cash", 1000, new Service("x",0));
  deleteAppointment: Appointment = new Appointment("", "", new Date(), new Date(), "cash", 0, new Service("",0));
  calendarPlugins = [dayGridPlugin]; // important!
  //INITIAL_EVENTS: EventInput[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {}
  currentEvents: EventApi[] = [];
  arr: any = [];
  patients: Patient[] = [];

  selectedDay: string = '';

  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    console.log(event)
    console.log(this.selectedDay)
  }

  ngOnInit(): void {
    this.getData();
    this.getPatients();
    // console.log(new mongoose.types.objectId)
  }

  getData() {
    this.docSrv.getAllAppointments().subscribe({
      next: a => {
        this.appointments = a;
        this.arr=[];
        for (let i = 0; i < this.appointments.length; i++) {
          this.arr.push({
            title:this.appointments[i].service.name,
            date:this.appointments[i].startDate,
            end:this.appointments[i].endDate,
            id:this.appointments[i]._id,
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
            events: this.arr,
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
    const title = this.newAppointment.service.name;
    // const paymentMethod = prompt('Please enter paymentMethod');
    // let s = prompt('Please enter Fees') || 0;
    // let fees: number = +s;

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // this.newAppointment.serviceName=title
    
      // const selectedCategoryArray = this.patients.filter(
      //   (itemCategory) =>
      //     this.prtl.category.id === itemCategory.id &&
      //     this.prtl.category.name === itemCategory.name
      // );
  
      // this.selectedCategory = selectedCategoryArray[0];

        this.newAppointment.service.name = title 
        this.newAppointment.patientID =  
        this.newAppointment.startDate =  new Date(selectInfo.start)
        this.newAppointment.endDate =  new Date(selectInfo.end)
        // this.open(this.contentFromHtml)

        this.docSrv.addAppointment(this.newAppointment).subscribe({
          next:a=>{this.newAppointment=a
            calendarApi.addEvent(
              {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
                id:this.newAppointment._id,
              });
          }
        })
      //this.docSrv.addAppointment(new Appointment("0","0", "0", new Date(selectInfo.startStr), 1, paymentMethod, fees, title));
      this.appointments.forEach(element => {
        console.log(element)
      });

    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      this.deleteAppointment._id= clickInfo.event.id
      this.docSrv.deleteAppointment(this.deleteAppointment._id).subscribe({
        next: a => { this.deleteAppointment = a; }
      })
      clickInfo.event.remove();
    }else {
      //!Redirect to prescription page
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  //?----------------------Patient-----------------------------//
  getPatients(){
    this.docSrvP.getAllPatient().subscribe({
      next: a => {
        this.patients = a;
        console.log(this.patients)
          }})
  }

  // //?-------------------------------Add Appointment--------------------------------?//
  // // Modal
  // closeResult = '';

  // open(content: any) {
    
  //   this.modalService.open(content, {backdrop: false,size: 'lg', keyboard: true, centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  // // end of modal

}