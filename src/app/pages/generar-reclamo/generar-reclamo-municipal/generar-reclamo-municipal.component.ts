import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

// ENTIDADES
import { Usuario } from 'src/app/_entities/usuario.entities';
import { ValidarReclamo, Reclamo, EnviarEmail } from 'src/app/_entities/reclamo.entities';

// SERVICIOS
import { SelectService } from 'src/app/services/select-service.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-generar-reclamo-municipal',
  templateUrl: './generar-reclamo-municipal.component.html',
  styleUrls: ['./generar-reclamo-municipal.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class GenerarReclamoMunicipalComponent implements OnInit {
  isLinear = false;
  frmDatosReclamante: FormGroup;
  frmDatosReclamo: FormGroup;
  user: Usuario;
  objUsuario: any;
  objValidarRec: ValidarReclamo;
  objRec: any = null;
  objUser: any;

  // PROPIEDADES UTILIZADAS PARA CORROBORAR QUE EL USUARIO NO REGISTRE MAS DE 1 RECLAMO POR DIA
  fechaRealizacion: any;
  objIDUser: any;
  fechaHoy: any;

  // CARGA DDLS
  arrArServ: any;
  arrTipRec: any;
  arrBarrio: any;
  arrCalle: any;
  arrCanal: any;
  lstCanal: any[] = [];

  // PROPIEDADES PARA LOS FILTROS
  arServ: any;
  tipoReclamo: any;
  TipoReclamoID: number;
  Calle: any;
  CalleID: number;
  Barrio: any;
  Canal: any;
  CanalID: number;
  altura: any;
  observacion: string;

  // OBJETOS PARA CARGAR DDLS
  objIDArServ: any = {};
  objIDBarrio: any = {};

  constructor(private ddlService: SelectService,
              private reclamoService: ReclamoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private ngZone: NgZone) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.fechaHoy = datePipe.transform(this.fechaHoy, 'dd/MM/yyyy');
  }

  ngOnInit() {
    try {
        this.frmDatosReclamante = this.formBuilder.group({
          dni: ['', Validators.required],
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          telefono: ['', Validators.required],
          email: ['', Validators.required]
        });

        this.frmDatosReclamo = this.formBuilder.group({
          areaServicio: ['', Validators.required],
          tipoReclamo: ['', Validators.required],
          barrio: ['', Validators.required],
          calle: ['', Validators.required],
          altura: ['', Validators.required],
          canal: ['', Validators.required],
          observaciones: ['']
        });

        this.cargaDDL();
    } catch (error) {
      console.log(error);
    }

  }

  cargaDDL() {
    this.ddlService.selectEntitie('AreaServicioController', 'SelectAreaServicio').subscribe(data => {
      this.arrArServ = JSON.parse(data);
    });

    this.ddlService.selectEntitie('BarrioController', 'SelectBarrio').subscribe(data => {
      this.arrBarrio = JSON.parse(data);
    });

    this.ddlService.selectEntitie('CanalController', 'SelectCanal').subscribe(data => {
      this.arrCanal = JSON.parse(data);

      for (let i = 0; i < this.arrCanal.length; i++) {
        const IDCanal: number = this.arrCanal[i].can_IDCanal;

        if (IDCanal <= 2) {
          this.lstCanal.push(this.arrCanal[i]);
        } else {
          return;
        }
      }
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO RECLAMO
  get frmReclamo() {
    return this.frmDatosReclamo.controls;
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO RECLAMO
  get frmReclamante() {
    return this.frmDatosReclamante.controls;
  }

  validarUsuario() {
    try {
      this.objUsuario = new Usuario();
      this.objUsuario.usu_dni = this.frmReclamante.dni.value;

      this.usuarioService.validarUsuario(this.objUsuario).subscribe(data => {
        if (JSON.parse(data)) {
          Swal.fire({
            allowOutsideClick: false,
            type: 'warning',
            title: 'Datos del Ciudadano',
            text: 'El usuario ya se encuentra registrado.'
          }).then(result => {
              if (result.value) {
                // this.router.navigateByUrl('/generar-reclamo-municipal');
                // this.frmDatosReclamante.reset();
              }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  validarReclamo() {
    try {
      this.objValidarRec = new ValidarReclamo();
      this.objValidarRec.rec_altura = this.frmReclamo.altura.value;
      this.objValidarRec.rec_IDCalle = this.frmReclamo.calle.value;
      this.objValidarRec.rec_IDBarrio = this.frmReclamo.barrio.value;
      this.objValidarRec.rec_IDTipoReclamo = this.frmReclamo.tipoReclamo.value;

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
                  this.frmDatosReclamo.reset();
                }
            });
          } else {
            this.objUser = {
              dni: this.frmReclamante.dni.value,
              nombre: this.frmReclamante.nombre.value,
              apellido: this.frmReclamante.apellido.value,
              telefono: this.frmReclamante.telefono.value,
              email: this.frmReclamante.email.value,
            };
            this.objRec = {
              areaServicio: this.arServ,
              tipoReclamo: this.tipoReclamo,
              barrio: this.Barrio,
              calle: this.Calle,
              altura: this.frmReclamo.altura.value,
              canal: this.Canal,
              observaciones: this.observacion
            };

            localStorage.setItem('objUsuario', JSON.stringify(this.objUser));
            localStorage.setItem('objReclamo', JSON.stringify(this.objRec));
            this.router.navigateByUrl('/registrar-reclamo');
          }
      });
    } catch (error) {
      console.log(error);
    }
  }

  cargaSelectTipoReclamo() {
    try {
      this.objIDArServ = {
        tipRec_IDArServ: this.frmReclamo.areaServicio.value
      };

      this.ddlService.selectTipoReclamo(this.objIDArServ).subscribe(data => {
        this.arrTipRec = JSON.parse(data);
        this.arServ = this.arrArServ.filter(x => x.arServ_IDAreaServicio === +this.frmReclamo.areaServicio.value)[0];
      });

      this.frmReclamo.tipoReclamo.setValue('');
    } catch (error) {
      console.log(error);
    }
  }

  cargaSelectCalle() {
    try {
        this.objIDBarrio = {
          bar_IDBarrio: this.frmReclamo.barrio.value
        };

        this.ddlService.selectCalle(this.objIDBarrio).subscribe(data => {
          this.arrCalle = JSON.parse(data);
          this.Barrio = this.arrBarrio.filter(x => x.bar_IDBarrio === +this.frmReclamo.barrio.value)[0];
        });

        this.frmReclamo.calle.setValue('');
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

  selectCanal() {
    this.Canal = this.arrCanal.filter(x => x.can_IDCanal === +this.CanalID)[0];
  }

  resetSelects() {
    this.frmReclamo.barrio.setValue('');
    this.frmReclamo.calle.setValue('');
    this.altura = null;
  }

  // mostrarErrorEmail() {
  //   return this.email.hasError('required') ? 'Ingrese Email' : this.email.hasError('email') ? 'Formato de Email no válido' : '';
  // }

  // VALIDACION CONTROL NUMEROS
  validarIngreso(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
