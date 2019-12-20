import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

// SERVICIOS
import { SelectService } from '../../../services/select-service.service';
import { ReclamoService } from '../../../services/reclamo.service';

// ENTIDADES
import { ValidarReclamo } from '../../../_entities/reclamo.entities';
import { Usuario } from '../../../_entities/usuario.entities';

@Component({
  selector: 'app-generar-reclamo-ciudadano',
  templateUrl: './generar-reclamo-ciudadano.component.html',
  styleUrls: ['./generar-reclamo-ciudadano.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class GenerarReclamoCiudadanoComponent implements OnInit {
  frmGenerarReclamo: FormGroup;
  user: Usuario;
  objValidarRec: ValidarReclamo;
  objReclamo: any;
  // boTipoReclamo = true;
  // boCalle = true;

  // Propiedades utilizadas para corroborar que el usuario no registre mas de 1 reclamo por día.
  fechaRealizacion: any;
  objIDUser: any;
  fechaHoy: any;

  // CARGA DDLS
  arrArServ: any;
  arrTipRec: any;
  arrBarrio: any;
  arrCalle: any;

  // PROPIEDADES PARA LOS FILTROS
  arServ: any;
  tipoReclamo: any;
  TipoReclamoID: number;
  Calle: any;
  CalleID: number;
  Barrio: any;
  altura: any;
  observacion: string;

  // OBJETOS PARA CARGAR DDLS
  objIDArServ: any = {};
  objIDBarrio: any = {};

  constructor(private ddlService: SelectService,
              private reclamoService: ReclamoService,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private ngZone: NgZone) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.objReclamo = JSON.parse(localStorage.getItem('objReclamo'));
  }

  ngOnInit() {
    try {
      this.frmGenerarReclamo = this.formBuilder.group({
        areaServicio: ['', Validators.required],
        tipoReclamo: [''],
        barrio: ['', Validators.required],
        calle: [''],
        altura: ['', Validators.required],
        observaciones: ['']
      });
      this.observacion = '';
      this.cargaDDL();
      this.modificarReclamo();
    } catch (error) {
      console.log(error);
    }
  }

  // Obtención de controles del formulario
  get frmGenerar() {
    return this.frmGenerarReclamo.controls;
  }

  cargaDDL() {
    this.ddlService.selectEntitie('AreaServicioController', 'SelectAreaServicio').subscribe(data => {
      this.arrArServ = JSON.parse(data);
    });

    this.ddlService.selectEntitie('BarrioController', 'SelectBarrio').subscribe(data => {
      this.arrBarrio = JSON.parse(data);
    });
  }

  modificarReclamo() {
    if (this.objReclamo === null) {
      // this.validarRealizacionReclamo();
    } else {
      // Asignación de valores a controles para poder modificar los datos del Reclamo
      this.frmGenerarReclamo.setValue({
        areaServicio: this.objReclamo.areaServicio.arServ_IDAreaServicio,
        tipoReclamo : this.objReclamo.tipoReclamo.tipRec_IDTipoReclamo,
        barrio: this.objReclamo.barrio.bar_IDBarrio,
        calle: this.objReclamo.calle.cal_IDCalle,
        altura: this.objReclamo.altura,
        observaciones: this.objReclamo.observaciones,
      });

      this.TipoReclamoID = this.objReclamo.tipoReclamo.tipRec_IDTipoReclamo,
      this.CalleID = this.objReclamo.calle.cal_IDCalle;
      this.altura = this.objReclamo.altura;
      this.observacion = this.objReclamo.observaciones;
      
      this.cargaSelectTipoReclamo();
      // this.frmGenerar.tipoReclamo.patchValue(this.objReclamo.tipRec_nombre);
      this.cargaSelectCalle();
      // this.frmGenerar.calle.patchValue(this.objReclamo.cal_nombre);
    }
  }

  validarRealizacionReclamo() {
      if (this.user.usu_IDRol === 1) {
        this.objIDUser = {
          usu_IDUsuario: this.user.usu_IDUsuario
        };

        this.reclamoService.validarRealizacionReclamo(this.objIDUser).subscribe(data => {
          const rtdo = JSON.parse(data);
          this.fechaHoy = new Date();
          this.fechaHoy = this.datePipe.transform(this.fechaHoy, 'dd/MM/yyyy');

          if (rtdo.rec_fechaAlta === this.fechaHoy) {
            Swal.fire({
              allowOutsideClick: false,
              type: 'warning',
              title: 'Registrar Reclamo',
              text: 'No puede realizar la operación nuevamente ya que sólo se puede enviar un reclamo por día.'
            }).then(result => {
              if (result.value) {
                this.router.navigateByUrl('/home');
              }
            });
          }
        }
      );
    }
  }

  validarReclamo() {
    try {
      this.objValidarRec = new ValidarReclamo();
      this.objValidarRec.rec_altura = this.frmGenerar.altura.value;
      this.objValidarRec.rec_IDCalle = this.frmGenerar.calle.value;
      this.objValidarRec.rec_IDBarrio = this.frmGenerar.barrio.value;
      this.objValidarRec.rec_IDTipoReclamo = this.frmGenerar.tipoReclamo.value;

      this.reclamoService.validarReclamo(this.objValidarRec).subscribe(data => {
        const obj = JSON.parse(data);

        if (obj !== null) {
            Swal.fire({
              allowOutsideClick: false,
              type: 'warning',
              title: 'Reclamo existente',
              text: 'El reclamo que intenta ingresar, ya se encuentra registrado. El estado del mismo es: ' + obj.rec_estado.toUpperCase()
            }).then(result => {
                if (result.value) {
                  this.frmGenerarReclamo.reset();
                }
              });
          } else {
            // Creación de objeto Reclamo
            this.objReclamo = {
              areaServicio: this.arServ,
              tipoReclamo: this.tipoReclamo,
              barrio: this.Barrio,
              calle: this.Calle,
              altura: this.frmGenerar.altura.value,
              observaciones: this.observacion.length > 0 ? this.observacion : ''
            };

              localStorage.setItem('objReclamo', JSON.stringify(this.objReclamo));
              this.router.navigateByUrl('/registrar-reclamo');
          }
      });
    } catch (error) {
      console.log(error);
    }
  }

  resetSelects() {
    this.frmGenerar.barrio.setValue('');
    this.frmGenerar.calle.setValue('');
    this.altura = null;
  }

  cargaSelectTipoReclamo() {
    try {
      this.objIDArServ = {
        tipRec_IDArServ: this.frmGenerar.areaServicio.value
      };

      this.ddlService.selectTipoReclamo(this.objIDArServ).subscribe(data => {
        this.arrTipRec = JSON.parse(data);
        this.arServ = this.arrArServ.filter(x => x.arServ_IDAreaServicio === +this.frmGenerar.areaServicio.value)[0];

        this.selectTipoReclamo();
      });

      if (this.objReclamo === null) {
        this.frmGenerar.tipoReclamo.setValue('');
      }

      // this.boTipoReclamo = true;

    } catch (error) {
      console.log(error);
    }
  }

  cargaSelectCalle() {
    try {
      this.objIDBarrio = {
        bar_IDBarrio: this.frmGenerar.barrio.value
      };

      this.ddlService.selectCalle(this.objIDBarrio).subscribe(data => {
        this.arrCalle = JSON.parse(data);
        this.Barrio = this.arrBarrio.filter(x => x.bar_IDBarrio === +this.frmGenerar.barrio.value)[0];

        this.selectCalle();
      });

      if (this.objReclamo === null) {
        this.frmGenerar.calle.setValue('');
      }

      // this.boCalle = true;
      
    } catch (error) {
      console.log(error);
    }
  }

  selectTipoReclamo() {
    this.tipoReclamo = this.arrTipRec.filter(x => x.tipRec_IDTipoReclamo === +this.TipoReclamoID)[0];
  }

  selectCalle() {
    this.Calle = this.arrCalle.filter(x => x.cal_IDCalle === +this.CalleID)[0];
  }

   // Validación para controles numéricos
  validarIngreso(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
