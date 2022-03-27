import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart, registerables } from '../../../../node_modules/chart.js'
Chart.register(...registerables);

@Component({
  selector: 'pm-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.css', '../../../assets/css/adminlte.min.css']
})
export class PrintReportComponent implements OnInit {

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
    const patientGenderPieChart = new Chart('revenue-chart-canvas', {
      type: 'pie',
      data: {
        labels: ['Female', 'Male',],
        datasets: [{
          label: 'Patient\'s Gender Rate',
          data: [60, 40],
          // TODO: Calc gender rate
          backgroundColor: [
            'rgba(153, 102, 255, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          hoverOffset: 4
        }]
      },
    });

    const incomeRateBarChart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Clinic income rate per month',
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55],
          // TODO: Calc income rate per month
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });

  }

}
