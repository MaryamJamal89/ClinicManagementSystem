import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Prescription } from '../../_models/prescription';

@Component({
  selector: 'pm-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css', '../../../../dist/css/adminlte.min.css']
})
export class AddPrescriptionComponent implements OnInit {

  newPrescription:Prescription= new Prescription("623c6abbfa1129ddbbb8062d","","");

  constructor(public docServ: DoctorService) { }

  ngOnInit(): void {
  }

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
