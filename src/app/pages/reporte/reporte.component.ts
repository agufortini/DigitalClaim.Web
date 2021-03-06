import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { ChartType, ChartOptions, ChartData } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

// ENTIDADES
import { ReporteService } from '../../services/reporte.service';
import { ReporteAreaServicio } from 'src/app/_entities/reporte.entities';
import { Usuario } from '../../_entities/usuario.entities';

// SERVICIOS
import { SelectService } from '../../services/select-service.service';
import { ReclamoService } from '../../services/reclamo.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  providers: [DatePipe]
})
export class ReporteComponent implements OnInit {
  frmReporte: FormGroup;
  user: Usuario;
  objReporte: any;
  fechaDesde: any;
  fechaHasta: any;
  lstReclamo: any[] = [];

  // Arrays controles selects
  arrReporteMunicipal = [
    { stReporte: 'AreaServicio', reporte: 'Reporte por Área de Servicio' },
    { stReporte: 'Barrio', reporte: 'Reporte por Barrio' },
  ];
  arrReporteOperativo = [
    { stReporte: 'TipoReclamo', reporte: 'Reporte por Tipo de Reclamo' },
    { stReporte: 'ReclamoPorEstado', reporte: 'Reporte de Reclamos por Estado' },
  ];

  // GRAFICO CIRCULAR
  // Para mostrar labels en el gráfico sin tener que pasar el cursor por encima
  public pieChartOptions: ChartOptions = {};
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [{
      backgroundColor: ['rgba(251,90,90,0.85)', 'rgba(251,178,90,0.85)', 'rgba(227,251,90,0.85)', 'rgba(90,251,112,0.85)', 'rgba(90,205,251,0.85)', 
      'rgba(151,90,251,0.85)', 'rgba(251,90,161,0.85)', 'rgba(205,98,205,0.85)', 'rgba(24,162,218,0.85)', 'rgba(20,161,8,0.85)']
    },
  ];


  constructor(private ddlService: SelectService,
              private formBuilder: FormBuilder,
              private reclamoService: ReclamoService,
              private datePipe: DatePipe,
              private reporteService: ReporteService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {

    try {
      this.frmReporte = this.formBuilder.group({
        fechaDesde: ['', Validators.required],
        fechaHasta: ['', Validators.required],
        reporte: ['', Validators.required],
        ranking: ['', Validators.required]
      });

    } catch (error) {
      console.log(error);
    }
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() { return this.frmReporte.controls; }

  verReporte() {
    try {
      // Se restauran los atributos del reporte para que no acumule valores
      this.pieChartLabels = [];
      this.pieChartData = [];
      
      // Captura de datos ingresados en formulario
      const fechaDesde = this.frmReporte.controls.fechaDesde.value;
      const fechaHasta = this.frmReporte.controls.fechaHasta.value;
      const reporte = this.frmReporte.controls.reporte.value;
      const ranking = this.frmReporte.controls.ranking.value;

      // Transformación de fecha a tipo string
      this.fechaDesde = this.datePipe.transform(fechaDesde, 'dd/MM/yyyy');
      this.fechaHasta = this.datePipe.transform(fechaHasta, 'dd/MM/yyyy');

      // Inicialización de objeto a pasar a método
      this.objReporte = {
        rec_fechaDesde: this.fechaDesde,
        rec_fechaHasta: this.fechaHasta,
        inTop: ranking,
        IDAreaServicio: this.user.usu_IDAreaServicio
      };

      switch (reporte) {
        case 'AreaServicio':
          this.graficoReporteAreaServicio();
          document.getElementById('tituloReporte').textContent = 'Reporte por Area de Servicio';
        break;
        case 'Barrio':
          this.graficoBarrio();
          document.getElementById('tituloReporte').textContent = 'Reporte por Barrio';
        break;
        case 'TipoReclamo':
          this.graficoTipoReclamo();
          document.getElementById('tituloReporte').textContent = 'Reporte por Tipo de Reclamo';
        break;
        case 'ReclamoPorEstado':
          this.graficoReclamoPorEstado();
          document.getElementById('tituloReporte').textContent = 'Reporte de Reclamo por Estado';
        break;
      }

      this.pieChartOptions = {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              const label = ctx.chart.data.labels[ctx.dataIndex] + ':' + value;
              return label;
            },
          },
        }
      };

      // this.pieChartOptions = {
      //   responsive: true,
      //   plugins: {
      //     datalabels: {
      //       formatter: (value, ctx) => {            
      //         let dataArr = ctx.chart.data.datasets[0].data;
      //         let total = Sum(dataArr);
      //         let percentage = (value * 100 / total).toFixed(2) + "%";
      //         return percentage;
      //       },
      //       color: 'black',
      //     }
      //   }
      // };

      document.getElementById('cardReporte').style.visibility = 'visible';
      this.resetForm();

    } catch (error) {
      console.log(error);
    }
  }
  
  graficoReporteAreaServicio() {
    // Llamada a método para traer los valores a mostrar en reporte
    this.reporteService.reportePorAreaServicio(this.objReporte).subscribe(data => {
      this.lstReclamo = JSON.parse(data);
    
      if (this.lstReclamo !== null) {
        for (let i = 0; i < this.lstReclamo.length; i++) {
          this.pieChartLabels.push(this.lstReclamo[i].AreaServicio);
          this.pieChartData.push(this.lstReclamo[i].CantidadReclamos);
        }
      }
    });
  }

  graficoBarrio() {
    // Llamada a método para traer los valores a mostrar en reporte
    this.reporteService.reportePorBarrio(this.objReporte).subscribe(data => {
      this.lstReclamo = JSON.parse(data);
  
      if (this.lstReclamo !== null) {
        for (let i = 0; i < this.lstReclamo.length; i++) {
          this.pieChartLabels.push(this.lstReclamo[i].Barrio);
          this.pieChartData.push(this.lstReclamo[i].ReclamosPorBarrio);
        }
      }
    });
  }

  graficoTipoReclamo() {
    // Llamada a método para traer los valores a mostrar en reporte
    this.reporteService.reportePorTipoReclamo(this.objReporte).subscribe(data => {
    this.lstReclamo = JSON.parse(data);
  
      if (this.lstReclamo !== null) {
        for (let i = 0; i < this.lstReclamo.length; i++) {
          this.pieChartLabels.push(this.lstReclamo[i].TipoReclamo);
           this.pieChartData.push(this.lstReclamo[i].CantidadReclamos);
        }
      }
    });
  }

  graficoReclamoPorEstado() {
    // Llamada a método para traer los valores a mostrar en reporte
    this.reporteService.reporteReclamoPorEstado(this.objReporte).subscribe(data => {
      this.lstReclamo = JSON.parse(data);
      
      if (this.lstReclamo !== null) {
        for (let i = 0; i < this.lstReclamo.length; i++) {
          this.pieChartLabels.push(this.lstReclamo[i].Estado);
          this.pieChartData.push(this.lstReclamo[i].CantidadReclamos);
        }
      }
    });
  }

  resetForm() {
    this.frmReporte.reset();
    this.frmReporte.controls.reporte.patchValue('');
    this.frmReporte.controls.tipoReporte.patchValue('');
  }

}
