import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// SERVICIOS
import { SelectService } from '../../services/select-service.service';
import { ReclamoService } from '../../services/reclamo.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styles: []
})
export class ReporteComponent implements OnInit {

  frmReporte: FormGroup;
  // user: any;

  // VISTA
  lstReclamo: any[] = null;

  // /* REPORTES */
  // // TORTA
  // public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  // public pieChartData: number[] = [300, 500, 100];
  // public pieChartType: ChartType = 'pie';

  // // BARRA
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType: ChartType = 'bar';
  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  // // DONA
  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  //   [50, 150, 120],
  //   [250, 130, 70],
  // ];
  // public doughnutChartType: ChartType = 'doughnut';

  constructor(private ddlService: SelectService,
              private formBuilder: FormBuilder,
              private reclamoService: ReclamoService) {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {

    try {
      this.frmReporte = this.formBuilder.group({
        fechaDesde: [null, Validators.required],
        fechaHasta: [null, Validators.required],
        areaServicio: [null],
        tipoReclamo: [null],
        barrio: [null],
      });

    } catch (error) {
      console.log(error);
    }
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() { return this.frmReporte.controls; }

}
