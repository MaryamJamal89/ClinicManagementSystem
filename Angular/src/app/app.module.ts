import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service'
import { HttpClientModule } from '@angular/common/http'
// full-calender
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';// a plugin!

import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { AddAppointmentDoctorComponent } from './doctor/add-appointment-doctor/add-appointment-doctor.component';
import { HeaderComponent } from './components/doctor-header/header.component';
import { AddAppointmentComponent } from './receptionist/add-appointment/add-appointment.component';
import { AddDoctorComponent } from './receptionist/add-doctor/add-doctor.component';
import { AddPatientComponent } from './receptionist/add-patient/add-patient.component';
import { AddReceptionistComponent } from './receptionist/add-receptionist/add-receptionist.component';
import { PrintInvoiceComponent } from './receptionist/print-invoice/print-invoice.component';
import { FooterComponent } from './components/reseptionist-footer/footer.component';
import { ReceptionistHeaderComponent } from './components/receptionist-header/receptionist-header.component';
import { MainSlidebarComponent } from './receptionist/main-slidebar/main-slidebar.component';
import { ReceptionistDashboardComponent } from './receptionist/receptionist-dashboard/receptionist-dashboard.component';
import { SearchPatientComponent } from './receptionist/search-patient/search-patient.component';
import { AddPrescriptionComponent } from './doctor/add-prescription/add-prescription.component';
import { DoctorFooterComponent } from './components/doctor-footer/doctor-footer.component';
import { LoginGuard } from './guards/login.guard';
import { DoctorService } from './doctor.service';
import { AboutComponent } from './about/about.component';
import { AboutUsReceptionistComponent } from './receptionist/about-us-receptionist/about-us-receptionist.component';
import { DoctorHeaderSideformComponent } from './components/doctor-header-sideform/doctor-header-sideform.component';
import { SimpleFooterComponent } from './components/simple-footer/simple-footer.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ReceptionistService } from './receptionist.service';
import { ConfirmationService } from './confirmation.service';
import { PrintReportComponent } from './receptionist/print-report/print-report.component';


const routes:Routes=
[
  {path:"login",component:LoginComponent},
  {path:"doctor",component:DoctorDashboardComponent,canActivate:[LoginGuard]},
  {path:"receptionist",component:ReceptionistDashboardComponent,canActivate:[LoginGuard]},
  {path:"doctor/prescription/:id",component:AddPrescriptionComponent,canActivate:[LoginGuard]},
  {path:"doctor/about",component:AboutComponent,canActivate:[LoginGuard]},
  {path:"receptionist/patient",component:AddPatientComponent,canActivate:[LoginGuard]},
  {path:"receptionist/appointment",component:AddAppointmentComponent,canActivate:[LoginGuard]},
  {path:"receptionist/doctor",component:AddDoctorComponent,canActivate:[LoginGuard]},
  {path:"receptionist/addReceptionist",component:AddReceptionistComponent,canActivate:[LoginGuard]},
  {path:"receptionist/report",component:PrintReportComponent,canActivate:[LoginGuard]},
  {path:"receptionist/about",component:AboutUsReceptionistComponent,canActivate:[LoginGuard]},
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"**",component:ErrorComponent},
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
    AboutComponent,
    AboutUsReceptionistComponent,
    DoctorHeaderSideformComponent,
    SimpleFooterComponent,
    ConfirmationDialogComponent,
    PrintReportComponent,
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
  providers: [ConfirmationService,CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
