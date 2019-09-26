import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

// SERVICIOS
import { SelectService } from '../../services/select-service.service';
import { OrdenServicioService } from '../../services/orden-servicio.service';
import { ReclamoService } from '../../services/reclamo.service';

// ENTIDADES
import { Historial } from '../../_entities/historial.entities';
import { OrdenServicio, DetalleOrdServ } from '../../_entities/orden-servicio.entities';
import { PersonalPorOrdenServicio, PersonalOrdServ } from '../../_entities/personal-por-orden-servicio.entities';
import { Usuario } from '../../_entities/usuario.entities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-orden-servicio',
  templateUrl: './registrar-orden-servicio.component.html',
  providers: [DatePipe]
})
export class RegistrarOrdenServicioComponent implements OnInit {
  frmRegistrarOrden: FormGroup;
  user: Usuario;
  lstReclamosPendientes: any;

  // CARGA DDL
  arrResp: any;
  objResp: any;
  arrPer: any;
  objPer: any;

  // REGISTRAR ORDEN SERVICIO
  objOrdServ: OrdenServicio;
  IDOrdServYNum: any;
  splitted: any;
  objDetalle: DetalleOrdServ;
  arrDetalleOrdServ: DetalleOrdServ[] = [];
  arrPerOrdServ: PersonalOrdServ[] = [];

  objIDRec: any;
  objRec: any;
  objHistorial: Historial;
  fecha = new Date();
  fechaHoy: any;
  objPerOrd: PersonalPorOrdenServicio;
  observaciones: string;
  minDate = new Date();

  constructor(private ddlService: SelectService,
              private formBuilder: FormBuilder,
              private ordServService: OrdenServicioService,
              private reclamoService: ReclamoService,
              private datePipe: DatePipe,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.fechaHoy = this.datePipe.transform(this.fecha, 'dd/MM/yyyy');
  }

  ngOnInit() {
    this.lstReclamosPendientes = JSON.parse(
      localStorage.getItem('arrReclamosPendientes')
    );

    // CONTROLES
    this.frmRegistrarOrden = this.formBuilder.group({
      fechaDesde: [null, Validators.required],
      fechaHasta: [null, Validators.required],
      responsable: ['', Validators.required],
      personal: ['', Validators.required],
      observaciones: ['']
    });

    try {
      this.cargaDDL();
    } catch (error) {
      console.log(error);
    }
  }

  cargaDDL() {
    this.objResp = {
      usu_IDAreaServicio: this.user.usu_IDAreaServicio,
    };

    this.ddlService.selectResponsable(this.objResp).subscribe(data => {
      this.arrResp = JSON.parse(data);
    });

    this.objPer = {
      per_IDAreaServicio: this.user.usu_IDAreaServicio
    };

    this.ddlService.selectPersonal(this.objPer).subscribe(data => {
      this.arrPer = JSON.parse(data);
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmRegistrarOrden.controls;
  }

  registrarOrdenServicio() {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });

      Swal.showLoading();

      // CREACION DE LA ORDEN DE SERVICIO
      this.objOrdServ = new OrdenServicio();
      this.objOrdServ.orServ_fechaAlta = this.fechaHoy;
      this.objOrdServ.orServ_fechaCierre = null;
      this.objOrdServ.orServ_fechaVencimiento = this.datePipe.transform(this.f.fechaHasta.value, 'dd/MM/yyyy');
      this.objOrdServ.orServ_observaciones = this.observaciones;
      this.objOrdServ.orServ_IDAreaServicio = this.user.usu_IDAreaServicio;
      this.objOrdServ.orServ_IDEstadoOrdenServicio = 1;

      // ACTUALIZACION DE RECLAMO ASIGNANDO LA ORDEN DE SERVICIO CORRESPONDIENTE
      this.ordServService.registrarOrdenServicio(this.objOrdServ).subscribe(dataOrdServ => {
          if (dataOrdServ) {
            this.IDOrdServYNum = dataOrdServ;
          }
          this.splitted = this.IDOrdServYNum.split(';', 2);

          this.lstReclamosPendientes.forEach(element => {
            this.objDetalle = new DetalleOrdServ();
            this.objDetalle.ordServ_IDOrdenServicio = +this.splitted[0];
            this.objDetalle.ordServ_numero = +this.splitted[1];
            this.objDetalle.ordServ_IDReclamo = element.rec_IDReclamo;
            this.objDetalle.ordServ_IDUsuario = this.f.responsable.value;
            this.arrDetalleOrdServ.push(this.objDetalle);
          });

          this.ordServService.registrarDetalleOrdenServicio(this.arrDetalleOrdServ).subscribe(dataDetalle => {
            if (+dataDetalle === 1) {
              const arrPersonal: PersonalOrdServ[] = [];
              arrPersonal.push(this.f.personal.value);

              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.f.personal.value.length; i++) {
                const objPer: PersonalOrdServ = new PersonalOrdServ();
                objPer.per_IDPersonal = this.f.personal.value[i];
                objPer.per_IDOrdenServicio = +this.splitted[0];
                objPer.per_numOrdServ = +this.splitted[1];
                this.arrPerOrdServ.push(objPer);
              }

              this.ordServService.registrarPersonalPorOrden(this.arrPerOrdServ).subscribe(dataPer => {
                if (+dataPer === 1) {
                  Swal.close();
                  Swal.fire({
                    allowOutsideClick: false,
                    type: 'success',
                    title: 'Orden de Servicio',
                    text: 'La Orden de Servicio se registró correctamente. Número de Orden: ' + this.objDetalle.ordServ_numero
                  }).then(result => {
                    if (result.value) {
                      this.router.navigateByUrl('/crear-ordenServicio');
                    }
                  });
                }
              });
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
}