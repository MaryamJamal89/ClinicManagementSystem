import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  constructor() { }

  ngOnInit(): void {
  }

}
