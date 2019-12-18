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

  frmCrearOrdenServicio: FormGroup;
  user: Usuario;
  fechaDesde: string;
  fechaHasta: string;
  ingresaFecha: boolean;
  // Objeto que almacena IDAreaServicio para salir a buscar los reclamos en estado "Sin Asignar"
  objFiltro: any = {};
  IDAreaServicio: number;
  lstReclamo: any = null;

  displayedColumns: string[] = ['select', 'rec_fechaAlta', 'tipRec_nombre', 'rec_direccion', 'bar_nombre', 'pri_nombre'];
  dataSource: MatTableDataSource<ReclamoPendiente>;
  selection = new SelectionModel<ReclamoPendiente>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private ddlService: SelectService,
              private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private reclamoService: ReclamoService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.frmCrearOrdenServicio = this.formBuilder.group({
      fechaDesde: [null, Validators.required],
      fechaHasta: [null, Validators.required]
    });

    // Listado de reclamos en estado "Sin Asignar", para añadir a la Orden de Servicio.
    this.selectReclamosSinAsignar();
  }

  selectReclamo() {
    if (this.fechaDesde !== undefined && this.fechaHasta !== undefined) {
      this.ingresaFecha = true;
      this.fechaDesde = this.datePipe.transform(this.frmCrearOrdenServicio.controls.fechaDesde.value, 'dd/MM/yyyy');
      this.fechaHasta = this.datePipe.transform(this.frmCrearOrdenServicio.controls.fechaHasta.value, 'dd/MM/yyyy');
    }

    this.selectReclamosSinAsignar();
  }

  async selectReclamosSinAsignar() {
    try {
      if (this.ingresaFecha) {
        this.objFiltro = {
          stFiltro: `arServ_IDAreaServicio = ${this.user.usu_IDAreaServicio}` + ' and ' + `rec_fechaAlta between '${this.fechaDesde}'` + ' and ' + `'${this.fechaHasta}'`
        };
      } else {
        this.objFiltro = {
          stFiltro: `arServ_IDAreaServicio = ${this.user.usu_IDAreaServicio}`
        };
      }

      this.reclamoService.selectReclamoSinAsignar(this.objFiltro).subscribe(data => {
        if (data !== '[]') {
            this.lstReclamo = JSON.parse(data);
            this.dataSource = new MatTableDataSource<ReclamoPendiente>(this.lstReclamo);
            this.dataSource.paginator = this.paginator;
            document.getElementById('idTableConsulta').style.visibility = 'visible';
            document.getElementById('seccionSiguiente').style.visibility = 'visible';
          } else {
            Swal.fire({
              allowOutsideClick: false,
              type: 'warning',
              title: 'Generar Orden Servicio',
              text: 'No se puede realizar la operación ya que no existen reclamos disponibles para registrar una Orden de Servicio.'
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get frmCrearOrden() {
    return this.frmCrearOrden.controls;
  }

  registrarOrdenServicio() {
    try {
      const arrReclamosPendientes: ReclamoPendiente[] = this.selection.selected;
      localStorage.setItem('reclamosPendientes', JSON.stringify(arrReclamosPendientes));
      this.router.navigateByUrl('/registrar-orden-servicio');
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

  // Filtro tabla
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}