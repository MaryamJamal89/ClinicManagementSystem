import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pm-add-appointment-doctor',
  templateUrl: './add-appointment-doctor.component.html',
  styleUrls: ['./add-appointment-doctor.component.css', '../../../../dist/css/adminlte.min.css']
})
export class AddAppointmentDoctorComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // Modal
  closeResult = '';

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // end of modal

}
