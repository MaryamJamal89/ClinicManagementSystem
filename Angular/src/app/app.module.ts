import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';// a plugin!


import { AppComponent } from './app.component';
import * as $ from 'jquery';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { PrescriptionAddComponent } from './doctor/prescription-add/prescription-add.component';
import { HeaderComponent } from './components/header/header.component';
import { AddAppointmentComponent } from './receptionist/add-appointment/add-appointment.component';
import { AddDoctorComponent } from './receptionist/add-doctor/add-doctor.component';
import { AddPatientComponent } from './receptionist/add-patient/add-patient.component';
import { AddReceptionistComponent } from './receptionist/add-receptionist/add-receptionist.component';
import { PrintInvoiceComponent } from './receptionist/print-invoice/print-invoice.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReceptionistHeaderComponent } from './components/receptionist-header/receptionist-header.component';
import { DoctorService } from './doctor.service';
import { MainSlidebarComponent } from './receptionist/main-slidebar/main-slidebar.component';
import { ReceptionistDashboardComponent } from './receptionist/receptionist-dashboard/receptionist-dashboard.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    DoctorDashboardComponent,
    PrescriptionAddComponent,
    HeaderComponent,
    AddAppointmentComponent,
    AddDoctorComponent,
    AddPatientComponent,
    AddReceptionistComponent,
    PrintInvoiceComponent,
    FooterComponent,
    ReceptionistHeaderComponent,
    MainSlidebarComponent,
    ReceptionistDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    HttpClientModule,
  ],
  providers: [DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
