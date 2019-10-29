import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

// SERVICIOS
import { SelectService } from 'src/app/services/select-service.service';

// CONTROLES
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ReclamoPendiente } from '../../_entities/reclamo.entities';
import { ReclamoService } from '../../services/reclamo.service';

// ENTIDADES
import { Usuario } from '../../_entities/usuario.entities';
import { TipoReclamo } from '../../_entities/ddl.entities';
import { Prioridad } from '../../_entities/prioridad.entities';
import { Barrio } from '../../_entities/barrio.entities';


@Component({
  selector: 'app-crear-orden-servicio',
  templateUrl: './crear-orden-servicio.component.html',
  styleUrls: ['./crear-orden-servicio.component.css'],
  providers: [
    DatePipe
  ]
})
export class CrearOrdenServicioComponent implements OnInit {

  frmCrearOrden: FormGroup;
  user: Usuario;

  displayedColumns: string[] = ['select', 'rec_fechaAlta', 'tipRec_nombre', 'rec_direccion', 'bar_nombre'];
  dataSource: MatTableDataSource<ReclamoPendiente>;
  selection = new SelectionModel<ReclamoPendiente>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // OBJETOS PARA CARGAR DDLS
  objArServ: any;

  // OBJETO PARA HACER LA CONSULTA DE RECLAMOS PENDIENTES
  objIDArServ: any = {};

  // CARGA DDLS
  arrTipRec: any;
  arrPrioridad: any;
  arrBarrio: any;

  IDAreaServicio: number;

  // Fecha máxima DatePicker
  maxDate = new Date();

  // VISTA
  stFiltro: string;
  objFiltro: any;
  boFecha = false;
  lstReclamo: any = null;


  // VARIABLES NGMODEL PARA CONTROLES ANGULAR MATERIAL
  ddlTipRec = '';
  ddlPri = '';
  ddlBar = '';

  constructor(private ddlService: SelectService,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private reclamoService: ReclamoService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.frmCrearOrden = this.formBuilder.group({
      fechaDesde: null,
      fechaHasta: null,
      tipoReclamo: [''],
      prioridad: [''],
      barrio: ['']
    });

    this.cargaDDL();
    this.selectReclamosSinAsignar();
  }

  cargaDDL() {
    try {
      this.objArServ = {
        tipRec_IDArServ: this.user.usu_IDAreaServicio
      };

      this.ddlService.selectTipoReclamo(this.objArServ).subscribe(data => {
        this.arrTipRec = JSON.parse(data);
      });

      this.ddlService.selectEntitie('TipoReclamoController', 'SelectPrioridad').subscribe(data => {
        this.arrPrioridad = JSON.parse(data);
      });

      this.ddlService.selectEntitie('BarrioController', 'SelectBarrio').subscribe(data => {
        this.arrBarrio = JSON.parse(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  selectReclamosSinAsignar() {
    try {
      this.objIDArServ = {
        usu_IDAreaServicio: this.user.usu_IDAreaServicio
      };

      this.reclamoService.selectReclamosSinAsignar(this.objIDArServ).subscribe(data => {
          this.lstReclamo = JSON.parse(data);
          this.dataSource = new MatTableDataSource<ReclamoPendiente>(this.lstReclamo);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmCrearOrden.controls;
  }

  filtroGeneral(ctrl: string) {
    try {
      switch (ctrl) {
        case 'tipoReclamo':
          const tipRec: TipoReclamo = this.lstReclamo.find(x => x.tipRec_IDTipoReclamo === this.f.tipoReclamo.value);
          this.applyFilter(tipRec.tipRec_nombre);
          break;
        case 'prioridad':
          const pri: Prioridad = this.lstReclamo.find(x => x.pri_IDPrioridad === this.f.prioridad.value);
          this.applyFilter(pri.pri_nombre);
          break;
        case 'barrio':
          const bar: Barrio = this.lstReclamo.find(x => x.bar_IDBarrio === this.f.barrio.value);
          this.applyFilter(bar.bar_nombre);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cancelarSeleccion(value: string) {
    switch (value) {
      case 'ddlTipRec':
        this.ddlTipRec = '';
        break;
      case 'ddlPri':
        this.ddlPri = '';
        break;
      case 'ddlBar':
        this.ddlBar = '';
        break;
    }
  }

  registrarOrdenServicio() {
    try {
      const arrReclamosPendientes: ReclamoPendiente[] = this.selection.selected;
      localStorage.setItem('reclamosPendientes', JSON.stringify(arrReclamosPendientes));
      this.router.navigateByUrl('/registrar-ordenServicio');
    } catch (error) {
      console.log(error);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select' } row ${row.position + 1}`;
  }
}

