import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { Complementos } from '../../../../complementos';

// ENTIDADES
import { EstadoReclamo, IEstadoReclamo } from '../../../../_entities/reclamo.entities';

// SERVICIOS
import { SelectService } from '../../../../services/select-service.service';
import { ReclamoService } from '../../../../services/reclamo.service';

@Component({
  selector: 'app-estado-reclamo',
  templateUrl: './estado-reclamo.component.html',
  styles: []
})
export class EstadoReclamoComponent implements OnInit {

  frmEstadoReclamo: FormGroup;
  objEstRec: EstadoReclamo;
  objIDEstRec: any;
  boBand = true;
  IDEstadoReclamo: number;

  // NG MODEL
  inputNombre: string;

  // TABLA
  displayedColumns = [
    'estRec_nombre',
    'Editar'
  ];
  dataSource: MatTableDataSource<IEstadoReclamo>;
  lstEstRec: IEstadoReclamo[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private selectService: SelectService,
              private reclamoService: ReclamoService,
              private complemento: Complementos) { }

  ngOnInit() {
    this.frmEstadoReclamo = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    this.selectEstadoReclamo();
  }

  selectEstadoReclamo() {
    this.selectService.selectEntitie('ReclamoController', 'SelectEstadoReclamo').subscribe(data => {
      this.lstEstRec = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IEstadoReclamo>(this.lstEstRec);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmEstadoReclamo.controls;
  }

  registrarEstadoReclamo(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objEstRec = new EstadoReclamo();
      this.objEstRec.estRec_IDEstadoReclamo = (boBand) ? 0 : this.IDEstadoReclamo;
      this.objEstRec.estRec_nombre = this.inputNombre;

      if (boBand) {
        this.reclamoService.registrarEstadoReclamo(this.objEstRec).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Estado Reclamo',
              'El Estado Reclamo ' + this.objEstRec.estRec_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectEstadoReclamo();
          } else {
            Swal.close();
            Swal.fire(
              'Estado Reclamo',
              'El Estado Reclamo ' + this.objEstRec.estRec_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
      } else {
        this.reclamoService.actualizarEstadoReclamo(this.objEstRec).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Estado Reclamo',
              'Los datos del Estado Reclamo ' + this.objEstRec.estRec_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm();
            this.selectEstadoReclamo();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarDataEstado(IDEstOrd: number, stEstOrd: string) {
    this.boBand = false;
    this.IDEstadoReclamo = IDEstOrd; // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.inputNombre = stEstOrd;
  }

  resetForm() {
    this.frmEstadoReclamo.reset();
    this.boBand = true;
    document.getElementById('txtEstRec').focus();
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
