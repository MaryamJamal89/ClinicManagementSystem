import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'pm-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css', '../../../../dist/css/adminlte.min.css']
})
export class PrintInvoiceComponent implements OnInit {
  @ViewChild('content')
  content!: ElementRef;


  public SavePDF(): void {
    let content = this.content.nativeElement;
    let doc = new jsPDF('p', 'pt', 'a4');
    let _elementHandlers =
    {
      '#editor': function (element: any, renderer: any) {
        return true;
      }
    };

    doc.html(content.innerHTML, {
      'width': 190,
      //'elementHandlers': _elementHandlers
    });
    doc.text(content.innerHTML, 10, 10);
    doc.save('invoice.pdf');
  }

  @ViewChild('print-btn')
  printBtn!: ElementRef;

  public Print(): void {
    window.print();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
