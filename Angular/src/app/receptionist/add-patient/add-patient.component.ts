import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceptionistService } from 'src/app/receptionist.service';
import { Patient } from 'src/app/_models/patient';

@Component({
  selector: 'pm-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css', '../../../assets/css/adminlte.min.css']
})
export class AddPatientComponent implements OnInit {

  newPatient:Patient= new Patient("","","male",new Date(),0);
  isValid:boolean = false;
  
  constructor(public patSer:ReceptionistService,private route:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
  }

  addPatient(){
    this.patSer.addPatient(this.newPatient).subscribe({
      next:a=>{
        this.newPatient=a
        this.backToDash()
      },
      error:e=>{
        this.isValid = true;
      }
      
    })
  }

  backToDash(){
    this.router.navigateByUrl(`/receptionist`);
  }

}
