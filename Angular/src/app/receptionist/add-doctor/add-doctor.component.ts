import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceptionistService } from 'src/app/receptionist.service';
import { Doctor } from 'src/app/_models/doctor';
import { Patient } from 'src/app/_models/patient';

@Component({
  selector: 'pm-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css', '../../../assets/css/adminlte.min.css']
})
export class AddDoctorComponent implements OnInit {
  newDoc:Doctor= new Doctor("62345f2086e4b9494d6237a4","","",0);
  image:any=null;
  isValid: boolean = false;

  constructor(public router:Router,public recSrv:ReceptionistService) { }

  ngOnInit(): void {
  }

  fileChange(e:any)
  {
    this.image=<File>e.target.files[0];
  }
  addDoc(){
    this.recSrv.addDoctor(this.newDoc).subscribe({
      next:a=>{
        const fd=new FormData();
        console.log(this.newDoc.userName)
        fd.append('image',this.image,this.newDoc.userName);
        this.recSrv.addImageDoctor(fd,this.newDoc.userName).subscribe({
          next:data=>{
            console.log(data);
          }
        })
       this.backToDash()
      },
      error:e=>{
        this.isValid = true;
        // alert("Some Thing Wrong Happened try Again"+e.message)
       console.log(e.message);
      }
    })
  }

  backToDash(){
    this.router.navigateByUrl(`/receptionist`);
  }

}
