import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
