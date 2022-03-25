import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/doctor.service';
import { ReceptionistService } from 'src/app/receptionist.service';
import { Appointment } from 'src/app/_models/appointment';
import { Doctor } from 'src/app/_models/doctor';
import { Patient } from 'src/app/_models/patient';
import { Prescription } from 'src/app/_models/prescription';
import { Service } from 'src/app/_models/service';

@Component({
  selector: 'pm-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css', '../../../assets/css/adminlte.min.css']
})
export class PrintInvoiceComponent implements OnInit {
  @ViewChild('content')
  content!: ElementRef;

  public openPDF(): void {
    let DATA: any = document.getElementById('content');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Inovice.pdf');
    });
  }

  @ViewChild('print-btn')
  printBtn!: ElementRef;

  public Print(): void {
    window.print();
  }

  //newPrescription:Prescription= new Prescription("","","");

  constructor(public docServ: DoctorService, public recepServ: ReceptionistService,private route:ActivatedRoute,public router:Router ) { }



  appointment: Appointment =new Appointment("","",new Date(),new Date ,"",0,new Service("",0));
  
  patient:Patient|undefined=new Patient("","","",new Date(),0)

  ClinicLocation:string="";

  doctor:Doctor =new Doctor("","","",0)
  
  id:any
  currentDate = new Date();
  Tax:number=0
  Total:number=0
  
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    
    console.log(this.id)
    this.getAppointments(this.id);
    
    this.Tax=this.appointment.fees*(0.15);
    this.Total=this.appointment.fees + this.Tax
  }

 //?----------------------Appointments-----------------------------//
 getAppointments(id:string) {
  this.docServ.getAppointmentByID(id).subscribe({
    next: a => {
      console.log(a)
    }
  })
}

  // //?----------------------Prescription-----------------------------//
  // addPresc(){
  //   console.log(this.newPrescription)
  //   this.docServ.addPrescription(this.newPrescription).subscribe({
  //     next:a=>{this.newPrescription=a
  //       this.backToDash()
  //     console.log(a)
  //     console.log(this.newPrescription)
  //     }

  //   })
  // }

  backToDash(){
    this.router.navigateByUrl(`/doctor`);
  }


}
