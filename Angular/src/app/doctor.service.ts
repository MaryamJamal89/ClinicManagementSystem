import { Injectable } from '@angular/core';
import { Doctor } from './_models/doctor';
import { Patient } from './_models/patient';
import { Prescription } from './_models/prescription';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctor:Doctor[]=[
    new Doctor("1","2","Nader","123",5),
    new Doctor("2","3","Bassem","1234",4),
  ]

  private prescription:Prescription[]=[
    new Prescription("4","1","1","Kotifan","2 Days","2 tabs"),
    new Prescription("5","2","2","Painkiller","5 Days","5 tabs"),
  ]
  constructor() { }

  add(newPres : Prescription){
    this.prescription.push(new Prescription(newPres._id,newPres.doctorId,newPres.patientID,newPres.medicineName,newPres.amountDesc,newPres.dose))
  }
  
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
