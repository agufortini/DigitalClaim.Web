import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

// CONTROLES
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalEstadoreclamoComponent } from '../modal-estadoreclamo/modal-estadoreclamo.component';

// SERVICIOS
import { SelectService } from 'src/app/services/select-service.service';
import { ReclamoService } from '../../services/reclamo.service';

// ENTIDADES
import { ReclamoC, ConsultarReclamo } from '../../_entities/reclamo.entities';
import { Usuario } from '../../_entities/usuario.entities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-reclamo',
  templateUrl: './consultar-reclamo.component.html',
  styleUrls: ['./consultar-reclamo.component.css'],
  providers: [
    DatePipe
  ]
})
export class ConsultarReclamoComponent implements OnInit {
  frmConsultarReclamo: FormGroup;
  user: Usuario;

  // VARIABLES NGMODEL PARA CONTROLES ANGULAR MATERIAL
  inputCodRec = '';
  inputDNI = '';
  ddlArServ = '';
  TipoReclamoID: number;
  ddlEstRec = '';
  ddlPri = '';
  ddlBar = '';

  // OBJETO PARA PASAR COMO PARAMETRO A SERVICIO
  objIDUser: any = {};
  objIDArServ: any = {};

  // CARGA DDLS
  arrArServ: any;
  arrTipRec: any;
  arrEstado: any;
  arrPrioridad: any;
  arrBarrio: any;
  boCarga = true;
  estadoReclamo: number;

  // AREA SERVICIO SELECCIONADO
  arServ: any;
  tipoReclamo: any;
  Estado: any;
  Prioridad: any;
  Barrio: any;

  // VISTA
  fechaDesde: any;
  fechaHasta: any;
  boBand = false;
  stFiltro: any;
  objFiltro: any = null;
  ttpFiltro = 'Más filtros';

  // TABLA
  displayedColumns = [
    'rec_codigo',
    'rec_fechaAlta',
    'arServ_nombre',
    'tipRec_nombre',
    'rec_direccion',
    'bar_nombre',
    'Ver'
  ];
  dataSource: MatTableDataSource<ConsultarReclamo>;
  lstReclamo: ConsultarReclamo[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  maxDate = new Date();

  // BOTON PARA MOSTRAR/OCULTAR FILTROS
  moreFilter = false;

  constructor(private reclamoService: ReclamoService,
              private formBuilder: FormBuilder,
              private ddlService: SelectService,
              private dialog: MatDialog,
              private datePipe: DatePipe) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    try {
      // CONTROLES
      if (this.user.usu_IDRol === 1) {
        this.frmControls();

        this.ddlService.selectEntitie('ReclamoController', 'SelectEstadoReclamo').subscribe(data => {
          this.arrEstado = JSON.parse(data);
          this.f.estado.patchValue(this.arrEstado[0].estRec_IDEstadoReclamo);
        });

        this.listarReclamosPendientes();
        document.getElementById('idTableConsulta').style.visibility = 'visible';
      } else {
        this.frmControls();
      }
    } catch (error) {
      console.log(error);
    }
  }

  frmControls() {
    this.frmConsultarReclamo = this.formBuilder.group({
      fechaDesde: [''],
      fechaHasta: [''],
      codRec: [''],
      dni: [''],
      areaServicio: [''],
      tipoReclamo: [''],
      estado: [''],
      prioridad: [''],
      barrio: ['']
    });
  }

  cargarDDL() {
    this.ddlService.selectEntitie('AreaServicioController', 'SelectAreaServicio').subscribe(data => {
      this.arrArServ = JSON.parse(data);
    });

    this.ddlService.selectEntitie('ReclamoController', 'SelectEstadoReclamo').subscribe(data => {
      this.arrEstado = JSON.parse(data);
    });

    this.ddlService.selectEntitie('PrioridadController', 'SelectPrioridad').subscribe(data => {
      this.arrPrioridad = JSON.parse(data);
    });

    this.ddlService.selectEntitie('BarrioController', 'SelectBarrio').subscribe(data => {
      this.arrBarrio = JSON.parse(data);
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmConsultarReclamo.controls;
  }

  listarReclamosPendientes() {
    this.objIDUser = {
      usu_IDUsuario: this.user.usu_IDUsuario,
      rec_IDEstadoReclamo: 1
    };

    this.selectServicio();
  }

  listarReclamosPorEstado() {
    this.objIDUser = {
      usu_IDUsuario: this.user.usu_IDUsuario,
      rec_IDEstadoReclamo: this.f.estado.value
    };

    this.selectServicio();
  }

  selectServicio() {
    this.reclamoService.listarReclamos(this.objIDUser).subscribe(data => {
      this.lstReclamo = JSON.parse(data);
      this.dataSource = new MatTableDataSource<ConsultarReclamo>(this.lstReclamo);
      this.dataSource.paginator = this.paginator;
    });
  }

  cargarDDLTipoReclamo() {
    try {
      this.objIDArServ = {
        tipRec_IDArServ: this.f.areaServicio.value
      };

      this.ddlService.selectTipoReclamo(this.objIDArServ).subscribe(data => {
        this.arrTipRec = JSON.parse(data);
        this.arServ = this.arrArServ.filter(x => x.arServ_IDAreaServicio === +this.f.areaServicio.value)[0];
      });
    } catch (error) {
      console.log(error);
    }
  }

  selectReclamo() {
    try {
      // VALIDAR QUE SE HAYA IMPLEMENTADO POR LO MENOS 1 CONTROL PARA FILTAR
      document.getElementById('idTableConsulta').style.visibility = 'visible';

      // if (this.f.fechaDesde.value !== '' && this.f.fechaHasta.value !== '') {
      //   if (this.f.fechaDesde.value < this.f.fechaHasta.value) {
      //     this.objFiltro = {
      //       // tslint:disable-next-line:quotemark
      //       stFiltro: "rec_fechaAlta between '" + this.f.fechaDesde.value + "' and '" + this.f.fechaHasta.value + "'"
      //     };
      //   } else {
      //     // Mensaje error validacion fechas
      //   }
      // } else if (this.f.fechaDesde.value !== '') {
      //   this.objFiltro = {
      //     // tslint:disable-next-line:quotemark
      //     stFiltro: "rec_fechaAlta between '" + this.f.fechaDesde.value + "'"
      //   };
      // } else if (this.f.fechaHasta.value !== '') {
      //   this.objFiltro = {
      //     // tslint:disable-next-line:quotemark
      //     stFiltro: "rec_fechaAlta between '" + this.f.fechaHasta.value + "'"
      //   };
      // }

      // CODIGO RECLAMO
      if (this.f.codRec.value !== '') {
        if (this.objFiltro === null) {
          // tslint:disable-next-line:quotemark
          this.stFiltro = "rec_codigo = " + this.f.codRec.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        } else {
          // tslint:disable-next-line:quotemark
          this.stFiltro += " and rec_codigo = " + this.f.codRec.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        }
      }

      // DNI USUARIO
      if (this.f.dni.value !== '') {
        if (this.objFiltro === null) {
          // tslint:disable-next-line:quotemark
          this.stFiltro = "usu_DNI = " + this.f.dni.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        } else {
          // tslint:disable-next-line:quotemark
          this.stFiltro += " and usu_DNI = " + this.f.dni.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        }
      }

      // AREA DE SERVICIO
      if (this.f.areaServicio.value !== '') {
        if (this.objFiltro === null) {
          // tslint:disable-next-line:quotemark
          this.stFiltro = "arServ_ID = " + this.f.areaServicio.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        } else {
          // tslint:disable-next-line:quotemark
          this.stFiltro += " and arServ_ID = " + this.f.areaServicio.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        }
      }

      // TIPO DE RECLAMO
      if (this.f.tipoReclamo.value !== '') {
        if (this.objFiltro === null) {
          // tslint:disable-next-line:quotemark
          this.stFiltro = "tipRec_ID = " + this.f.tipoReclamo.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        } else {
          // tslint:disable-next-line:quotemark
          this.stFiltro += " and tipRec_ID = " + this.f.tipoReclamo.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        }
      }

      // ESTADO
      if (this.f.estado.value !== '') {
        if (this.objFiltro === null) {
          // tslint:disable-next-line:quotemark
          this.stFiltro = "rec_IDEstado = " + this.f.estado.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        } else {
          // tslint:disable-next-line:quotemark
          this.stFiltro += " and rec_IDEstado = " + this.f.estado.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        }
      }

      // PRIORIDAD
      if (this.f.prioridad.value !== '') {
        if (this.objFiltro === null) {
          // tslint:disable-next-line:quotemark
          this.stFiltro = "pri_ID = " + this.f.prioridad.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        } else {
          // tslint:disable-next-line:quotemark
          this.stFiltro += " and pri_ID = " + this.f.prioridad.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        }
      }

      // BARRIO
      if (this.f.barrio.value !== '') {
        if (this.objFiltro === null) {
          // tslint:disable-next-line:quotemark
          this.stFiltro = "bar_ID = " + this.f.barrio.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        } else {
          // tslint:disable-next-line:quotemark
          this.stFiltro += " and bar_ID = " + this.f.barrio.value;
          this.objFiltro = {
            stFiltro: this.stFiltro
          };
        }
      }

      console.log(this.objFiltro);

      this.reclamoService.selectReclamo(this.objFiltro).subscribe(data => {
        if (data) {
          this.lstReclamo = JSON.parse(data);
          this.dataSource = new MatTableDataSource<ConsultarReclamo>(this.lstReclamo);
          this.dataSource.paginator = this.paginator;
        } else {
          Swal.fire({
            allowOutsideClick: false,
            type: 'warning',
            title: 'Consultar reclamo',
            text: 'No se encontraron reclamos con el filtro aplicado'
          });
          this.frmConsultarReclamo.reset();
        }
      });

      this.objFiltro = null;
      this.stFiltro = '';

    } catch (error) {
      console.log(error);
    }
  }

  // MOSTRAR/OCULTAR FILTROS EXTRAS
  masFiltros() {
    if (!this.moreFilter) {
      this.moreFilter = true;
      document.getElementById('btnIcon').textContent = 'remove';
      this.ttpFiltro = 'Menos filtros';

      if (this.boCarga) {
        this.cargarDDL();
        this.boCarga = false;
      }
    } else {
      this.moreFilter = false;
      document.getElementById('btnIcon').textContent = 'add';
      this.ttpFiltro = 'Más filtros';
    }
  }

  // FILTRO TABLA
  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }

  // VALIDACION INGRESO NUMEROS
  validarIngreso(event): boolean {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
  }

  // MODAL DETALLE RECLAMO
  verEstados(element: ReclamoC) {
    try {
      // Guardo el IDReclamo en el localStorage para despues poder hacer el rating del reclamo
      localStorage.setItem('rec_IDReclamo', JSON.stringify(element.rec_IDReclamo));

      if (element) {
        this.dialog.open(ModalEstadoreclamoComponent, {
          width: '50%',
          data: {
            obj: element
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectTipoReclamo() {
    this.tipoReclamo = this.arrTipRec.filter(x => x.tipRec_IDTipoReclamo === +this.TipoReclamoID)[0];
  }
}
