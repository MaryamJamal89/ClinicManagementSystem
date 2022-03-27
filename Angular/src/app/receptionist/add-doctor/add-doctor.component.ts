import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css', '../../../assets/css/adminlte.min.css']
})
export class AddDoctorComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  backToDash(){
    this.router.navigateByUrl(`/receptionist`);
  }

}
