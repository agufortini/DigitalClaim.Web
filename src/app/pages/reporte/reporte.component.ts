import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartsModule, Label, MultiDataSet } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { ChartType, ChartDataSets } from 'chart.js';

// ENTIDADES
import { ReporteService } from '../../services/reporte.service';

// SERVICIOS
import { SelectService } from '../../services/select-service.service';
import { ReclamoService } from '../../services/reclamo.service';
import { ReporteAreaServicio } from 'src/app/_entities/reporte.entities';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  providers: [DatePipe]
})
export class ReporteComponent implements OnInit {
  frmReporte: FormGroup;
  objReporte: any;
  fechaDesde: any;
  fechaHasta: any;
  lstReclamo: any[] = [];

  arrReporte = [
    { stReporte: '1', reporte: 'Reporte por Área de Servicio' },
    { stReporte: '2', reporte: 'Reporte por Barrio' },
  ];
  arrTipoReporte = [
    { stTipoReporte: 'pie', tipoReporte: 'Gráfico Circular' },
    { stReporte: 'bar', tipoReporte: 'Gráfico de Barra' },
    { stReporte: 'doughnut', tipoReporte: 'Gráfico de Dona' }
  ];

  // TORTA
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';

  // // BARRA
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

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
              private reclamoService: ReclamoService,
              private datePipe: DatePipe,
              private reporteService: ReporteService) { }

  ngOnInit() {

    try {
      this.frmReporte = this.formBuilder.group({
        fechaDesde: ['', Validators.required],
        fechaHasta: ['', Validators.required],
        reporte: ['', Validators.required]
        // tipoReporte: ['', Validators.required]
      });

    } catch (error) {
      console.log(error);
    }
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() { return this.frmReporte.controls; }

  verReporte() {
    try {
      // Captura de datos ingresados
      const fechaDesde = this.frmReporte.controls.fechaDesde.value;
      const fechaHasta = this.frmReporte.controls.fechaHasta.value;
      const reporte = this.frmReporte.controls.reporte.value;
      // const tipoReporte = this.frmReporte.controls.tipoReporte.value;

      // Transformación de fecha
      this.fechaDesde = this.datePipe.transform(fechaDesde, 'dd/MM/yyyy');
      this.fechaHasta = this.datePipe.transform(fechaHasta, 'dd/MM/yyyy');

      this.objReporte = {
        rec_fechaDesde: this.fechaDesde,
        rec_fechaHasta: this.fechaHasta
      };

      this.reporteService.reportePorAreaServicio(this.objReporte).subscribe(data => {
        this.lstReclamo = JSON.parse(data);

        if (this.lstReclamo !== null) {
          for (let i = 0; i < this.lstReclamo.length; i++) {
            this.pieChartLabels.push(this.lstReclamo[i].TipoReclamo);
            this.pieChartData.push(this.lstReclamo[i].CantReclamos);
          }
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  resetForm() {
    this.frmReporte.reset();
    this.frmReporte.controls.reporte.patchValue('');
    this.frmReporte.controls.tipoReporte.patchValue('');
  }

}
