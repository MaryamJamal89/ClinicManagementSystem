import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/doctor.service';
import { Prescription } from '../../_models/prescription';

@Component({
  selector: 'pm-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css', '../../../assets/css/adminlte.min.css']
})
export class AddPrescriptionComponent implements OnInit {

  id:any
  newPrescription:Prescription= new Prescription("","","");
  constructor(public docServ: DoctorService, private route:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    this.newPrescription.appointmentID=this.id
    console.log(this.id)
  }

  addPresc(){
    console.log(this.newPrescription)
    this.docServ.addPrescription(this.newPrescription).subscribe({
      next:a=>{this.newPrescription=a
        this.backToDash()
      console.log(a)
      console.log(this.newPrescription)
      }

    })
  }

  backToDash(){
    this.router.navigateByUrl(`/doctor`);
  }

}
