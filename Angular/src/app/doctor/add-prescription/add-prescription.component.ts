import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { ReceptionistService } from 'src/app/receptionist.service';
import { Appointment } from 'src/app/_models/appointment';
import { Doctor } from 'src/app/_models/doctor';
import { Patient } from 'src/app/_models/patient';
import { Service } from 'src/app/_models/service';
import { Prescription } from '../../_models/prescription';

@Component({
  selector: 'pm-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css', '../../../assets/css/adminlte.min.css']
})
export class AddPrescriptionComponent implements OnInit {

  newPrescription:Prescription= new Prescription("623c6abbfa1129ddbbb8062d","","");

  constructor(public docServ: DoctorService, public recepServ: ReceptionistService ) { }

  appointment: Appointment[] = []//new Appointment("","",new Date(),new Date ,"",0,new Service("",0));

  patName: string="";
  patient:Patient|undefined =new Patient("","","",new Date(),0)
  

  docName: string="";
  doctor:Doctor|undefined =new Doctor("","","",0)


  ngOnInit(): void {
    this.getAppointments("623c6abbfa1129ddbbb8062d");
    console.log(this.appointments)


    this.findAppointments("623c6abbfa1129ddbbb8062d");
    this.findPatient(this.appObj?.patientID);
    this.findDocotor(this.appObj?.doctorID)
  }

  

  /////////////////Find a spacific patient
  // findAppointments(appID:string) {
  //   console.log(this.appointment)
  //   this.appObj =this.appointment.find(ele => ele._id == appID)
  // }
  // findPatient(patientID?:string) {
  //   console.log(this.patients)
  //   this.patObj =this.patients.find(ele => ele._id == patientID)
  // }
  // findDocotor(DocotoID?:string) {
  //   console.log(this.doctors)
  //   this.docObj =this.doctors.find(ele => ele._id == DocotoID)
  // }

 //?----------------------Appointments-----------------------------//
 getAppointments(id:string) {
  this.docServ.getAppointmentByID(id).subscribe({
    next: a => {
      console.log(a)
       this.appointment = a;
      // getPatients(this.appointment)
    }
  })
}
  //?----------------------Patient-----------------------------//
  getPatients(id:string) {
    this.recepServ.getAllPatient(id).subscribe({
      next: a => {
        console.log(a)
        // this.patient = a;
      }
    })
  }
  
    //?----------------------Doctor-----------------------------//
    getDoctors(id:string) {
      this.docServ.getDocotrByID(id).subscribe({
        next: a => {
          console.log(a)
          // this.doctor = a;
        }
      })
    }

  //?----------------------Prescription-----------------------------//
  addPresc(){
    console.log(this.newPrescription)
    this.docServ.addPrescription(this.newPrescription).subscribe({
      next:a=>{this.newPrescription=a
      console.log(a)
      console.log(this.newPrescription)
      }
    })
  }

}
