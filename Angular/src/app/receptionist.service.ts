import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { Appointment } from './_models/appointment';
import { Doctor } from './_models/doctor';
import { Patient } from './_models/patient';
import { Prescription } from './_models/prescription';
import { Service } from './_models/service';
import { Receptionist } from './_models/receptionist';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {

 //?----------------------------Temp Objects------------------------------?//
showAppointment:boolean=false;
constructor(public http:HttpClient) { }



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

deleteAppointment(id:string){
  return this.http.delete<Appointment>(`http://localhost:8080/appointments/${id}`);
}

//?----------------------------Patient------------------------------?//
addPatient(newPatient : Patient){
  return this.http.post<Patient>("http://localhost:8080/patient",newPatient)
  //this.appointment.push(new Appointment(newApp._id,newApp.doctorID,newApp.patientID,newApp.date,newApp.period,newApp.paymentMethod,newApp.fees,newApp.service))
}


getPatientByID(id:string){
  return this.http.get<Patient>(`http://localhost:8080/patient/${id}`);
}
getAllPatient(){
  return this.http.get<Patient[]>("http://localhost:8080/patient");
}

//?----------------------------Patient------------------------------?//
getRecepByID(id:string){
  return this.http.get<Receptionist>(`http://localhost:8080/receptionist/${id}`);
}

//?----------------------------Doctor------------------------------?//
addDoctor(newDoc : Doctor){
  return this.http.post<Doctor>("http://localhost:8080/doctor",newDoc)
}

//?----------------------------Recep------------------------------?//
addRecep(newRecep : Receptionist){
  return this.http.post<Receptionist>("http://localhost:8080/receptionist",newRecep)
}

imageRecep(username:string){
 return this.http.get(`http://localhost:8080/receptionist/image/${username}.jpg`,{ responseType: 'blob' }) 
}

addImageRecep(fd:FormData,username:string){
  return this.http.post(`http://localhost:8080/receptionist/image/${username}`,fd) 
 }
  //?----------------------------Image------------------------------?//
  imageDoctor(username:string){
    return this.http.get(`http://localhost:8080/doctor/image/${username}.jpg`,{ responseType: 'blob' })
  }
  
  addImageDoctor(fd:FormData,username:string){
    return this.http.post(`http://localhost:8080/doctor/image/${username}`,fd)
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
