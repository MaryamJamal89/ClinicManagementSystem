import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pm-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css', '../../../assets/css/adminlte.min.css']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title: string="";
  @Input() message: string="";
  @Input() option1: string="";
  @Input() option2: string="";
  @Input() btnOkText: string="";
  @Input() btnCancelText: string="";
  @Input() btnDeleteText: string="";

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public decline() {
    this.activeModal.close("decline");
  }

  public delete() {
    this.activeModal.close("deleted");
  }

  public accept() {
    this.activeModal.close("accept");
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
