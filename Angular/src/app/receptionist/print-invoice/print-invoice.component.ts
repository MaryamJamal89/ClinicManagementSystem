import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/doctor.service';
import { ReceptionistService } from 'src/app/receptionist.service';
import { Appointment } from 'src/app/_models/appointment';
import { Doctor } from 'src/app/_models/doctor';
import { Patient } from 'src/app/_models/patient';
import { Service } from 'src/app/_models/service';
import { Clinic } from 'src/app/_models/clinic';
import { Location } from 'src/app/_models/location';

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

  constructor(public docServ: DoctorService, public recepServ: ReceptionistService,private route:ActivatedRoute,public router:Router ) { }

    data:any;
    appointment: Appointment =new Appointment("","",new Date(),new Date ,"",0,new Service("",0));
    
    patient:Patient|undefined=new Patient("","","",new Date(),0)

    
    newClinic: Clinic = new Clinic(new Location("",""),[new Service("",0)]);

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
      this.data= a
      this.appointment = this.data.Appointment

      this.doctor=this.data.Doctor
      this.getServices(this.doctor.clinic_id)

      this.patient=this.data.Patient 

    }
  })
}
 //?----------------------Clinic Services-----------------------------//
    getServices(clinicId:string) {
      this.docServ.getServicesByClinicId(clinicId).subscribe({
        next: a => {
          this.newClinic = a;
        }
      })
    }


  backToDash(){
    this.router.navigateByUrl(`/doctor`);
  }


}
