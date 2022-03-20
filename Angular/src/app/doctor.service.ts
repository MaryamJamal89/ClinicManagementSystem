import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Appointment } from './_models/appointment';
import { Doctor } from './_models/doctor';
import { Patient } from './_models/patient';
import { Prescription } from './_models/prescription';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  //?----------------------------Temp Objects------------------------------?//

  private doctor:Doctor[]=[
    new Doctor("1","2","Nader","123",5),
    new Doctor("2","3","Bassem","1234",4),
  ]

  private prescription:Prescription[]=[
    new Prescription("4","1","1","Kotifan","2 Days","2 tabs"),
    new Prescription("5","2","2","Painkiller","5 Days","5 tabs"),
  ]

  private appointment:Appointment[]=[
    new Appointment("5","1","1",new Date(2022,2,22,10,30),1,"Cash",1000,"X-ray"),
    new Appointment("5","1","1",new Date(2022,2,23,10,30),1,"Cash",1000,"TEST"),
    new Appointment("5","1","1",new Date(2022,2,25,2,30),1,"Cash",1000,"VVAS"),
    new Appointment("5","1","1",new Date(2022,3,25,7,30),1,"Cash",1000,"HHA"),
    new Appointment("5","1","1",new Date(2022,4,25,5,30),1,"Cash",1000,"QUES"),
    new Appointment("5","1","1",new Date(2022,11,25,13,30),1,"Cash",1000,"AXD"),
  ]
  constructor() { }

  //?----------------------------Prescription------------------------------?//

  addPrescription(newPres : Prescription){
    this.prescription.push(new Prescription(newPres._id,newPres.doctorId,newPres.patientID,newPres.medicineName,newPres.amountDesc,newPres.dose))
  }
  getAllPrescription():Prescription[]{
    return this.prescription;
  }

  //?----------------------------Appointment------------------------------?//

  addAppointment(newApp : Appointment){
    this.appointment.push(new Appointment(newApp._id,newApp.doctorId,newApp.patientID,newApp.appDate,newApp.period,newApp.paymentMethod,newApp.fees,newApp.serviceName))
  }

    getAllAppointments():Appointment[]{
    return this.appointment;
  }
  //?----------------------------Temp------------------------------?//

  //   getAppointmentByDate(date:Data):Appointment{
  //   for (let i = 0; i < this.appointment.length; i++) {
  //     if (this.appointment[i].appDate==date) {
  //       return new Department(this.departments[i].DeptId,this.departments[i].DeptName)
  //     }
  //   }
  //   return new Department(0,"");
  // }
  
  // getAllDepartments():Department[]{
  //   return this.departments;
  // }
  
  // getDepartmentById(id:number):Department{
  //   for (let i = 0; i < this.departments.length; i++) {
  //     if (this.departments[i].DeptId==id) {
  //       return new Department(this.departments[i].DeptId,this.departments[i].DeptName)
  //     }
  //   }
  //   return new Department(0,"");
  // }
  // edit(editDepartment:Department){
  //   for (let i = 0; i < this.departments.length; i++) {
  //     if (this.departments[i].DeptId==editDepartment.DeptId) {
  //       this.departments[i].DeptName=editDepartment.DeptName;
  //     }
  //   }
  //}
}
