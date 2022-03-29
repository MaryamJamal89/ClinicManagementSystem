import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { Appointment } from './_models/appointment';
import { Doctor } from './_models/doctor';
import { Patient } from './_models/patient';
import { Prescription } from './_models/prescription';
import { Service } from './_models/service';
import { Clinic } from './_models/clinic';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  //?----------------------------Temp Objects------------------------------?//

  private doctor:Doctor[]=[]

  private prescription:Prescription[]=[]

  private appointment:Appointment[]=[
    new Appointment("1","1",new Date(2022,2,22,10,30),new Date(2022,2,22,11,30),"Cash",1000,new Service("ssss",0)),
    new Appointment("1","1",new Date(2022,2,23,10,30),new Date(2022,2,23,11,30),"Cash",1000,new Service("ssss",0)),
    new Appointment("1","1",new Date(2022,2,25,2,30),new Date(2022,2,25,3,30),"Cash",1000,new Service("ssss",0)),
  ]
  constructor(public http:HttpClient) { }

  //?----------------------------Prescription------------------------------?//

  addPrescription(newPresc : Prescription){
    return this.http.post<Prescription>("http://localhost:8080/prescription",newPresc)
  }
  getAllPrescription():Prescription[]{
    return this.prescription;
  }

  //?----------------------------Appointment------------------------------?//

  addAppointment(newApp : Appointment){
    return this.http.post<Appointment>("http://localhost:8080/appointments",newApp)
    //this.appointment.push(new Appointment(newApp._id,newApp.doctorID,newApp.patientID,newApp.date,newApp.period,newApp.paymentMethod,newApp.fees,newApp.service))
  }


  //   getAllAppointment():Appointment[]{
  //   return this.appointment;
  // }

  getAllAppointments(){
    return this.http.get<Appointment[]>("http://localhost:8080/appointments");
  }
  getAppointmentByID(id:string){
    return this.http.get<Appointment>(`http://localhost:8080/appointments/${id}`);
  }

  deleteAppointment(id:string){
    return this.http.delete<Appointment>(`http://localhost:8080/appointments/${id}`);
  }
  //?----------------------------Clinic------------------------------?//

  getServicesByClinicId(id:string){
    return this.http.get<Clinic>(`http://localhost:8080/clinic/service/${id}`);
  }
  //?----------------------------Doctors------------------------------?//
  getAllDoctors(){
    return this.http.get<Doctor[]>("http://localhost:8080/doctor");
  }
  getDocotrByID(id:string){
    return this.http.get<Doctor>(`http://localhost:8080/doctor/${id}`);
  }  

  //?----------------------------Image------------------------------?//
  imageDoctor(username:string){
    return this.http.get(`http://localhost:8080/doctor/image/${username}.jpg`)
  }
  
  addImageDoctor(fd:FormData){
    return this.http.post("http://localhost:8080/doctor/image",fd)
  }

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
