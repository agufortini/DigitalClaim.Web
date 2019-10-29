import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { Complementos } from '../../../../complementos';

// ENTIDADES
import { EstadoOrdenServicio, IEstadoOrdenServicio } from '../../../../_entities/orden-servicio.entities';

// SERVICIOS
import { OrdenServicioService } from '../../../../services/orden-servicio.service';
import { SelectService } from '../../../../services/select-service.service';

@Component({
  selector: 'app-estado-orden-servicio',
  templateUrl: './estado-orden-servicio.component.html',
  styles: []
})
export class EstadoOrdenServicioComponent implements OnInit {

  frmEstadoOrden: FormGroup;
  objEstOrd: EstadoOrdenServicio;
  objIDEstOrd: any;
  boBand = true;
  IDEstadoOrden: number;

  // NG MODEL
  inputNombre: string;

  // TABLA
  displayedColumns = [
    'estOrd_nombre',
    'Editar'
  ];
  dataSource: MatTableDataSource<IEstadoOrdenServicio>;
  lstEstOrd: IEstadoOrdenServicio[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private selectService: SelectService,
              private ordServService: OrdenServicioService,
              private complemento: Complementos) { }

  ngOnInit() {
    this.frmEstadoOrden = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    this.selectEstadoOrdenServicio();
    console.log(this.lstEstOrd);
  }

  selectEstadoOrdenServicio() {
    this.selectService.selectEntitie('OrdenServicioController', 'SelectEstadoOrdenServicio').subscribe(data => {
      this.lstEstOrd = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IEstadoOrdenServicio>(this.lstEstOrd);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmEstadoOrden.controls;
  }

  registrarEstadoOrden(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objEstOrd = new EstadoOrdenServicio();
      this.objEstOrd.estOrd_IDEstado = (boBand) ? 0 : this.IDEstadoOrden;
      this.objEstOrd.estOrd_nombre = this.inputNombre;

      if (boBand) {
        this.ordServService.registrarEstadoOrdenServicio(this.objEstOrd).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Estado Orden Servicio',
              'El Estado Orden Servicio ' + this.objEstOrd.estOrd_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectEstadoOrdenServicio();
          } else {
            Swal.close();
            Swal.fire(
              'Estado Orden Servicio',
              'El Estado Orden Servicio ' + this.objEstOrd.estOrd_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
      } else {
        this.ordServService.actualizarEstadoOrdenServicio(this.objEstOrd).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Estado Orden Servicio',
              'Los datos del Estado Orden Servicio ' + this.objEstOrd.estOrd_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm();
            this.selectEstadoOrdenServicio();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarDataEstado(IDEstOrd: number, stEstOrd: string) {
    this.boBand = false;
    this.IDEstadoOrden = IDEstOrd; // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.inputNombre = stEstOrd;
  }

  resetForm() {
    this.frmEstadoOrden.reset();
    this.boBand = true;
    document.getElementById('txtEstOrd').focus();
  }

  // FILTRO TABLA
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  validarNum(event) {
    return this.complemento.validarNum(event);
  }
}
