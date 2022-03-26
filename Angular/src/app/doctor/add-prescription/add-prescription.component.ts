import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  newPrescription:Prescription= new Prescription("","","");

  data:any 
  appointment: Appointment =new Appointment("" , "" , new Date() , new Date() ,"", 0 , new Service("",0));
  
  patName:string=""
  patient:Patient=new Patient("","","",new Date(),0)
  
  docName: string="";
  doctor:Doctor =new Doctor("","","",0)
  
  appId:any
  
  constructor(public docServ: DoctorService, public recepServ: ReceptionistService,private route:ActivatedRoute,public router:Router ) { }
 
  ngOnInit(): void {
    this.appId=this.route.snapshot.paramMap.get('id')
    
    console.log(this.appId)
    this.newPrescription.appointmentID=this.appId
    this.getAppointments(this.appId);
  }

 //?----------------------Appointments-----------------------------//
 getAppointments(id:string) {
  this.docServ.getAppointmentByID(id).subscribe({
    next: a => {
        this.data = a;
        this.appointment=this.data.Appointment
        
        this.doctor=this.data.Doctor
        this.patient= this.data.Patient
        
        if(this.doctor)
        this.docName=this.doctor.userName
        
        if(this.patient)
        this.patName=this.patient.name

        // this.newPrescription.appointmentID=this.appointment._id
    }
  })
}
  
  //?----------------------Prescription-----------------------------//
  addPresc(){
    console.log(this.newPrescription)
    this.docServ.addPrescription(this.newPrescription).subscribe({
      next:a=>{
      this.newPrescription=a
      this.backToDash()
      }
    })
  }

  backToDash(){
    this.router.navigateByUrl(`/doctor`);
  }

}
