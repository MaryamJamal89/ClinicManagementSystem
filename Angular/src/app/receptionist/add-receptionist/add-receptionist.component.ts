import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceptionistService } from 'src/app/receptionist.service';
import { Receptionist } from 'src/app/_models/receptionist';

@Component({
  selector: 'pm-add-receptionist',
  templateUrl: './add-receptionist.component.html',
  styleUrls: ['./add-receptionist.component.css', '../../../assets/css/adminlte.min.css']
})
export class AddReceptionistComponent implements OnInit {
  newRecep:Receptionist= new Receptionist("62345f2086e4b9494d6237a4","","","");
  permission:string="";
  constructor(public router:Router,public recSrv:ReceptionistService) { }

  ngOnInit(): void {
  }

  selectPermission(event: any){
    if(event.target.value)
    this.permission = event.target.value;
  }

  addRecep(){
    this.newRecep.permissions=this.permission
    this.recSrv.addRecep(this.newRecep).subscribe({
      next:a=>{this.newRecep=a}
    })
  }
 
  backToDash(){
    this.router.navigateByUrl(`/receptionist`);
  }
}
