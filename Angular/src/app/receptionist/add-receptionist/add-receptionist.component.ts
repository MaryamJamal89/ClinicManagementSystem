import { HttpClient } from '@angular/common/http';
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
  image:any=null;
  isValid:boolean = false;

  constructor(public router:Router,public recSrv:ReceptionistService,public http:HttpClient) { }

  ngOnInit(): void {
  }

  selectPermission(event: any){
    if(event.target.value)
    this.permission = event.target.value;
  }
  
  fileChange(e:any)
  {
    this.image=<File>e.target.files[0];
  }
  
  addRecep(){
    this.newRecep.permissions=this.permission
    this.recSrv.addRecep(this.newRecep).subscribe({
      next:a=>{
        console.log("catched the error")
        const fd=new FormData();
        fd.append('image',this.image,this.newRecep.userName);
        this.recSrv.addImageRecep(fd,this.newRecep.userName).subscribe({
          next:data=>{
            this.backToDash()
          }
        })
      },
      error:e=>{
        this.isValid = true;
        // alert("Some Thing Wrong Happened try Again" + e)
      }
    })
  }
 
  backToDash(){
    this.router.navigateByUrl(`/receptionist`);
  }
}
