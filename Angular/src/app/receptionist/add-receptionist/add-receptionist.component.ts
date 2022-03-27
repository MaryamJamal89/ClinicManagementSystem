import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-add-receptionist',
  templateUrl: './add-receptionist.component.html',
  styleUrls: ['./add-receptionist.component.css', '../../../assets/css/adminlte.min.css']
})
export class AddReceptionistComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  backToDash(){
    this.router.navigateByUrl(`/receptionist`);
  }
}
