import {
  Input,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
  VERSION,
} from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare let $: any;

import { Chart, registerables } from '../../../../node_modules/chart.js';
Chart.register(...registerables);

import { Appointment } from 'src/app/_models/appointment';
import { DoctorService } from '../../doctor.service';

import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; //< import. it
import { EventInput } from '@fullcalendar/angular';

import { arrow } from '@popperjs/core';
import { Service } from '../../_models/service';
import { ReceptionistService } from '../../receptionist.service';
import { Patient } from '../../_models/patient';
import { Clinic } from '../../_models/clinic';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/confirmation.service';
import { Location } from 'src/app/_models/location';
import { CookieService } from 'ngx-cookie-service';
import { Doctor } from 'src/app/_models/doctor';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'pm-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: [
    './doctor-dashboard.component.css',
    '../../../assets/css/adminlte.min.css',
  ],
})
export class DoctorDashboardComponent implements OnInit {
  constructor(
    private docSrv: DoctorService,
    private docSrvP: ReceptionistService,
    public router: Router,
    public conf: ConfirmationService,
    private cookieService: CookieService,
    public authser: AuthServiceService
  ) {}

  appointments: Appointment[] = [];
  newAppointment: Appointment = new Appointment(
    '',
    '',
    new Date(),
    new Date(),
    '',
    0,
    new Service('', 0)
  );
  deleteAppointment: Appointment = new Appointment(
    '',
    '',
    new Date(),
    new Date(),
    'cash',
    0,
    new Service('', 0, '')
  );
  cookieDoc: Doctor = new Doctor('', '', '', 0, '');
  calendarPlugins = [dayGridPlugin]; // important!
  calendarVisible = true;
  calendarOptions: CalendarOptions = {};
  currentEvents: EventApi[] = [];
  arr: any = [];
  patients: Patient[] = [];
  selectedPatID: string = '';
  selectedServId: string = '';
  selectedServFees: number = 0;
  patName: string = '';
  FeesAmount: number = 0;
  paymentMethod: string = '';
  cookieTemp = '';
  serviceObj: any; //Service= new Service("",0);
  patObj: any; //Service= new Service("",0);
  initialized = false; // I added this to stop fullcalender component rendering
  services: Service[] = [];
  newClinic: Clinic = new Clinic(new Location('', ''), this.services);
  isImageLoading: boolean = true;
  imageToShow: any;

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedPatID = event.target.value;
    this.patObj = this.patients.find((ele) => ele._id == this.selectedPatID);
    this.patName = this.patObj.name;
  }

  selectChangeServices(event: any) {
    //update the ui
    this.selectedServId = event.target.value;
    this.serviceObj = this.newClinic.services.find(
      (ele) => ele._id == this.selectedServId
    );
    console.log('ya rab ID', this.serviceObj);
    this.selectedServFees = this.serviceObj.fees;
  }

  ngOnInit(): void {
    this.getPatients();
    this.getData();
    this.getServices('62345f2086e4b9494d6237a4');
    this.cookieTemp = this.cookieService.get('ID');
    this.getDocotr(this.cookieTemp);
  }

  getData() {
    this.docSrv.getAllAppointments().subscribe({
      next: (a) => {
        this.appointments = a;
        this.arr = [];

        for (let i = 0; i < this.appointments.length; i++) {
          this.patObj = this.patients.find(
            (ele) => ele._id == this.appointments[i].patientID
          );
          if (this.appointments[i].doctorID == this.cookieTemp) {
            if (this.patObj != undefined) this.patName = this.patObj.name;
            this.arr.push({
              title: this.patName + ' - ' + this.appointments[i].service.name,
              date: this.appointments[i].startDate,
              end: this.appointments[i].endDate,
              id: this.appointments[i]._id,
            });
          }
        }
        if (this.appointments.length != 0) {
          setTimeout(() => {
            this.calendarOptions = {
              headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
              },
              initialView: 'timeGridWeek',
              //initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
              weekends: true,
              editable: false,
              selectable: true,
              selectMirror: true,
              dayMaxEvents: true,
              select: this.handleDateSelect.bind(this),
              eventClick: this.handleEventClick.bind(this),
              eventsSet: this.handleEvents.bind(this),
              events: this.arr,
            };
            this.initialized = true;
          });
        }
      },
    });
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
    // this.openConfirmationDialog(selectInfo);
    if (confirm('Add event?') == false) return;
    const calendarApi = selectInfo.view.calendar;
    // const title = this.serviceObj.name;
    //console.log("1st",this.selectedPatID)
    //console.log("1st",this.serviceObj.name)
    //console.log("1st",this.serviceObj.fees)
    console.log('1st', this.FeesAmount);
    console.log('1st', this.paymentMethod);
    calendarApi.unselect(); // clear date selection

    if (true) {
      if (
        this.selectedPatID == '' ||
        this.serviceObj == undefined ||
        this.FeesAmount == 0 ||
        this.paymentMethod == ''
      ) {
        alert('Please, Complete the appointment info!');
        return;
      }
      console.log('2nd', this.serviceObj.name);

      this.newAppointment.patientID = this.selectedPatID;
      this.newAppointment.doctorID = this.cookieTemp;
      this.newAppointment.service.name = this.serviceObj.name;
      this.newAppointment.service.fees = this.serviceObj.fees;
      this.newAppointment.service._id = this.serviceObj._id;
      this.newAppointment.startDate = new Date(selectInfo.start);
      this.newAppointment.endDate = new Date(selectInfo.end);
      this.newAppointment.fees = this.FeesAmount;
      this.newAppointment.paymentMethod = this.paymentMethod;
      this.docSrv.addAppointment(this.newAppointment).subscribe({
        next: (a) => {
          this.newAppointment = a;
          calendarApi.addEvent({
            title: this.patName + ' | ' + this.serviceObj.name,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
            id: this.newAppointment._id,
          });
        },
      });
    }
  }

  openConfirmationDialog(clickInfo: EventClickArg) {
    this.conf
      .confirm(
        'New Prescription',
        'Do you want to add naw prescription?',
        'Confirm to add prescription to the appointment, or Delete the appointment',
        'Press Cancel or ESC to cancel'
      )
      .then((confirmed) => {
        if (confirmed == 'accept') {
          this.redirectToPresc(clickInfo);
        } else if (confirmed == 'deleted') {
          this.DeleteAppointment(clickInfo);
        }
      })
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }

  // AddConfirmationDialog(selectInfo : EventClickArg) {
  //   this.conf.confirm('Do you Want to add prescription ?', 'Do you Want to add prescription ?', 'OK to add prescription', 'Press Cancel or ESC to cancel')
  //   .then((confirmed) => {if(confirmed =="accept"){this.redirectToPresc(clickInfo)}else if (confirmed =="deleted"){this.DeleteAppointment(clickInfo)}})
  //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  // }

  handleEventClick(clickInfo: EventClickArg) {
    this.openConfirmationDialog(clickInfo);

    // this.deleteAppointment._id = clickInfo.event.id
    // this.docSrv.deleteAppointment(this.deleteAppointment._id).subscribe({
    //   next: a => { this.deleteAppointment = a; }
    // })
    // clickInfo.event.remove();
  }

  redirectToPresc(clickInfo: EventClickArg) {
    console.log('recscsccs');
    this.router.navigateByUrl(`/doctor/prescription/${clickInfo.event.id}`);
  }
  DeleteAppointment(clickInfo: EventClickArg) {
    this.deleteAppointment._id = clickInfo.event.id;
    this.docSrv.deleteAppointment(this.deleteAppointment._id).subscribe({
      next: (a) => {
        this.deleteAppointment = a;
      },
    });
    clickInfo.event.remove();
  }

  // handleEventClick(clickInfo: EventClickArg) {

  //   this.openConfirmationDialog();
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     this.deleteAppointment._id = clickInfo.event.id
  //     this.docSrv.deleteAppointment(this.deleteAppointment._id).subscribe({
  //       next: a => { this.deleteAppointment = a; }
  //     })
  //     clickInfo.event.remove();
  //   } else {
  //     //!Redirect to prescription page
  //     this.router.navigateByUrl(`/doctor/prescription/${clickInfo.event.id}`);
  //   }
  // }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  //?----------------------Patient-----------------------------//
  getPatients() {
    this.docSrvP.getAllPatient().subscribe({
      next: (a) => {
        this.patients = a;
        console.log(this.patients);
      },
    });
  }
  //?----------------------Patient-----------------------------//
  getDocotr(id: string) {
    this.docSrv.getDocotrByID(id).subscribe({
      next: (a) => {
        this.cookieDoc = a;
        this.getImage(`${this.cookieDoc.userName}Doctor`);
      },
    });
  }

  //?----------------------Images-----------------------------//

  getImage(username: string) {
    this.isImageLoading = true;
    this.docSrv.imageDoctor(username).subscribe({
      next: (a) => {
        this.createImageFromBlob(a);
        this.isImageLoading = false;
        console.log('image', a);
      },
      error: (e)=> {
        this.isImageLoading = false;
        console.log('image error', e);
      }
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
   }
  //?----------------------Clinic Services-----------------------------//
  getServices(clinicId: string) {
    this.docSrv.getServicesByClinicId(clinicId).subscribe({
      next: (a) => {
        this.newClinic = a;
        console.log(this.newClinic);
        console.log(this.newClinic.services);
      },
    });
  }

  //?-------------------------------Add Appointment--------------------------------?//
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
