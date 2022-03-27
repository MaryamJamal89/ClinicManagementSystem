import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; //< import. it
import { EventInput } from '@fullcalendar/angular';
import { Appointment } from '../../_models/appointment';
import { ReceptionistService } from '../../receptionist.service';
import { Service } from '../../_models/service';
import { DoctorService } from '../../doctor.service';
import { Patient } from '../../_models/patient';
import { Clinic } from '../../_models/clinic';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/confirmation.service';
import { Location } from 'src/app/_models/location';
import { Doctor } from 'src/app/_models/doctor';

@Component({
  selector: 'pm-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrls: [
    './receptionist-dashboard.component.css',
    '../../../assets/css/adminlte.min.css',
  ],
})
export class ReceptionistDashboardComponent implements OnInit {
  constructor(
    private docSrv: DoctorService,
    public recSrv: ReceptionistService,
    public router: Router,
    public conf: ConfirmationService
  ) {}
  showApp() {
    this.recSrv.showAppointment = !this.recSrv.showAppointment;
  }

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
    new Service('', 0)
  );
  calendarPlugins = [dayGridPlugin]; // important!
  calendarVisible = true;
  calendarOptions: CalendarOptions = {};
  currentEvents: EventApi[] = [];
  arr: any = [];
  patients: Patient[] = [];
  selectedPatID: string = '';
  selectedDocID: string = '';
  selectedServId: string = '';
  selectedServFees: number = 0;
  patName: string = '';
  FeesAmount: number = 0;
  paymentMethod: string = '';
  serviceObj: any; //Service= new Service("",0);
  patObj: any; //Service= new Service("",0);
  services: Service[] = [];
  newClinic: Clinic = new Clinic(new Location('', ''), this.services);
  docotrs: Doctor[] = [];

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedPatID = event.target.value;
    this.patObj = this.patients.find((ele) => ele._id == this.selectedPatID);
    this.patName = this.patObj.name;
  }
  selectChangeDoctor(event: any) {
    //update the ui
    this.selectedDocID = event.target.value;
  }

  selectChangeServices(event: any) {
    //update the ui
    this.selectedServId = event.target.value;
    this.serviceObj = this.newClinic.services.find(
      (ele) => ele._id == this.selectedServId
    );
    this.selectedServFees = this.serviceObj.fees;
  }

  ngOnInit(): void {
    this.getPatients();
    this.getDoctors();
    this.getData();
    this.getServices('62345f2086e4b9494d6237a4');
    // console.log(new mongoose.types.objectId)
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
          if (this.patObj != undefined) this.patName = this.patObj.name;
          this.arr.push({
            title: this.patName + ' - ' + this.appointments[i].service.name,
            date: this.appointments[i].startDate,
            end: this.appointments[i].endDate,
            id: this.appointments[i]._id,
          });
        }
        setTimeout(() => {
          this.calendarOptions = {
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
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
        });
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
    if (confirm('Add event?') == false) return;
    // const title = this.serviceObj.name;
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

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
      this.newAppointment.doctorID = this.selectedDocID;
      this.newAppointment.patientID = this.selectedPatID;
      this.newAppointment.service = this.serviceObj;
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
      // //this.docSrv.addAppointment(new Appointment("0","0", "0", new Date(selectInfo.startStr), 1, paymentMethod, fees, title));
      // this.appointments.forEach(element => {
      //   console.log(element)
      // });
    }
  }

  openConfirmationDialog(clickInfo : EventClickArg) {
    this.conf.confirm('Appointment Invoice', 'Do you want the appointment\'s invoice?', 'Confirm to show appointment\'s invoice, or Delete the appointment', 'Press Cancel or ESC to cancel')
    .then((confirmed) => {if(confirmed =="accept"){this.redirectToPresc(clickInfo)}else if (confirmed =="deleted"){this.DeleteAppointment(clickInfo)}})
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  
  handleEventClick(clickInfo: EventClickArg) {
    this.openConfirmationDialog(clickInfo);
  }

  redirectToPresc(clickInfo: EventClickArg) {
    console.log('recscsccs');
    this.router.navigateByUrl(`receptionist/invoice/${clickInfo.event.id}`);
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
    this.recSrv.getAllPatient().subscribe({
      next: (a) => {
        this.patients = a;
        console.log(this.patients);
      },
    });
  }

  //?----------------------Doctor-----------------------------//
  getDoctors() {
    this.docSrv.getAllDoctors().subscribe({
      next: (a) => {
        this.docotrs = a;
      },
    });
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
  // addDepartment(){
  //   this.stdSer.add(this.newDepartment).subscribe({
  //     next:a=>{this.newDepartment=a}
  //   })
  //   this.router.navigate(["./department"])
  // }
}
