import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'pm-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css', '../../../../dist/css/adminlte.min.css']
})
export class AddPatientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
