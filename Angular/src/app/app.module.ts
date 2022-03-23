import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';// a plugin!
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import * as $ from 'jquery';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';

import { AddAppointmentDoctorComponent } from './doctor/add-appointment-doctor/add-appointment-doctor.component';
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
import { SearchPatientComponent } from './receptionist/search-patient/search-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPrescriptionComponent } from './doctor/add-prescription/add-prescription.component';
import { DoctorFooterComponent } from './doctor/doctor-footer/doctor-footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes:Routes=
[
  {path:"login",component:LoginComponent},
  {path:"doctor",component:DoctorDashboardComponent,canActivate:[LoginGuard]},
  {path:"receptionist",component:ReceptionistDashboardComponent,canActivate:[LoginGuard]},
  {path:"",redirectTo:"/login",pathMatch:"full"}
]

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
    SearchPatientComponent,
    AddAppointmentDoctorComponent,
    AddPrescriptionComponent,
    DoctorFooterComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    HttpClientModule,
    MatDatepickerModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ],
  exports: [
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [DoctorService],
  bootstrap: [AppComponent]
})

export class AppModule { }
