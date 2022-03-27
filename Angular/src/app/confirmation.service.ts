import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    option1:string,
    option2:string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    btnDeleteText: string = 'Delete',
    dialogSize: 'sm'|'lg' = 'lg'): Promise<string> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {backdrop:false, size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.option1 = option1;
    modalRef.componentInstance.option2 = option2;
    modalRef.componentInstance.btnDeleteText = btnDeleteText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.btnOkText = btnOkText;

    return modalRef.result;
  }

  
}
