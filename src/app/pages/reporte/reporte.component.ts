import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  arrArServ: any;
  arrTipRec: any;
  arrBarrio: any;

  // AREA SERVICIO SELECCIONADO
  arServ: any;
  tipoReclamo: any;
  TipoReclamoID: any;

  objIDArServ: any;

  // VISTA
  lstReclamo: any[] = null;

  constructor(private ddlService: SelectService,
              private formBuilder: FormBuilder,
              private reclamoService: ReclamoService) {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {

    this.frmReporte = this.formBuilder.group({
      fechaDesde: [null, Validators.required],
      fechaHasta: [null, Validators.required],
      areaServicio: [null],
      tipoReclamo: [null],
      barrio: [null],
    });

    try {

      this.ddlService.selectEntitie('AreaServicioController', 'SelectAreaServicio').subscribe(
        (data) => {
          this.arrArServ = JSON.parse(data);
        }
      );

      this.ddlService.selectEntitie('BarrioController', 'SelectBarrio').subscribe(
        (data) => {
          this.arrBarrio = JSON.parse(data);
        }
      );

    } catch (error) {
      console.log(error);
    }
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() { return this.frmReporte.controls; }


  cargarDDLTipoReclamo() {

    try {

      this.objIDArServ = {
        tipRec_IDArServ: this.f.areaServicio.value
      };

      this.ddlService.selectTipoReclamo(this.objIDArServ).subscribe(
        (data) => {
          this.arrTipRec = JSON.parse(data);
        }
      );

      if (this.lstReclamo === null) {

        this.reclamoService.selectReclamo('arServ_ID = ' + this.f.areaServicio.value).subscribe(
          (data) => {
            this.lstReclamo = data;
            console.log(this.lstReclamo);
          }
        );
      } else {
        this.lstReclamo = this.lstReclamo.filter(x => x.arServ_ID === +this.f.areaServicio.value)[0];
      }

    } catch (error) {
      console.log(error);
    }

  }

  selectTipoReclamo() {

    try {
      this.lstReclamo = this.lstReclamo.filter(x => x.tipRec_ID === +this.f.tipoReclamo.value)[0];
    } catch (error) {
      console.log(error);
    }

  }

  selectBarrio() {

    try {

      if (this.lstReclamo.length === null) {

        this.reclamoService.selectReclamo('bar_ID = ' + this.f.barrio.value).subscribe(
          (data) => {
            this.lstReclamo = data;
          }
        );

      } else {
        this.lstReclamo = this.lstReclamo.filter(x => x.bar_ID === +this.f.barrio.value)[0];
      }

    } catch (error) {
      console.log(error);
    }

  }

}
