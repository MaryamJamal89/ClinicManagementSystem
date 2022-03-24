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

  appointment: Appointment =new Appointment("","",new Date(),new Date ,"",0,new Service("",0));

  patName: string="";
  patient:Patient|undefined=new Patient("","","",new Date(),0)
  

  docName: string="";
  doctor:Doctor =new Doctor("","","",0)


  ngOnInit(): void {
    this.getAppointments("623c6abbfa1129ddbbb8062d");
    console.log(this.appointment)
  }

 //?----------------------Appointments-----------------------------//
 getAppointments(id:string) {
  this.docServ.getAppointmentByID(id).subscribe({
    next: a => {
      console.log(a)
       this.appointment = a;
       console.log(this.appointment.doctorID)
       this.getDoctors(this.appointment.doctorID)
       this.getPatients(this.appointment.patientID)
    }
  })
}
  //?----------------------Patient-----------------------------//
  getPatients(id:string) {
    this.recepServ.getPatientByID(id).subscribe({
      next: a => {
        console.log(a)
         this.patient = a;
         if(this.patient==null) return;
         this.patName=this.patient.name
      }
    })
  }
  
    //?----------------------Doctor-----------------------------//
    getDoctors(id:string) {
      this.docServ.getDocotrByID(id).subscribe({
        next: a => {
          console.log("doctor",a)
          this.doctor = a;
          if(this.doctor==null) return; 
          this.docName=this.doctor.userName
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
