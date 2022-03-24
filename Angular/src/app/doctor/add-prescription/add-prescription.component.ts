import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Prescription } from '../../_models/prescription';

@Component({
  selector: 'pm-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css', '../../../../dist/css/adminlte.min.css']
})
export class AddPrescriptionComponent implements OnInit {

  newPrescription:Prescription= new Prescription("","","","","");

  constructor(public docServ: DoctorService) { }

  ngOnInit(): void {
  }

  addPresc(){
    this.docServ.addPrescription(this.newPrescription).subscribe({
      next:a=>{this.newPrescription=a}
    })
  }

}
