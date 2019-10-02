import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

// ENTIDADES
import { IPrioridad, Prioridad } from '../../../_entities/prioridad.entities';

// SERVICIOS
import { SelectService } from 'src/app/services/select-service.service';
import { PrioridadService } from '../../../services/prioridad.service';

@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html'
})
export class PrioridadComponent implements OnInit {

  frmPrioridad: FormGroup;
  objPrioridad: Prioridad;
  inputPri = '';
  boBand = true;
  IDPrioridad: number;

  // TABLA
  displayedColumns = [
    'pri_nombre',
    'Editar'
  ];
  dataSource: MatTableDataSource<IPrioridad>;
  lstPrioridad: IPrioridad[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private selectService: SelectService,
              private prioridadService: PrioridadService) { }

  ngOnInit() {
    this.frmPrioridad = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    this.selectPrioridad();
  }

  selectPrioridad() {
    this.selectService.selectEntitie('PrioridadController', 'SelectPrioridad').subscribe(data => {
      this.lstPrioridad = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IPrioridad>(this.lstPrioridad);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmPrioridad.controls;
  }

  registrarPrioridad(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objPrioridad = new Prioridad();
      this.objPrioridad.pri_IDPrioridad = (boBand) ? 0 : this.IDPrioridad;
      this.objPrioridad.pri_nombre = this.f.nombre.value;

      if (boBand) {
        this.prioridadService.registrarPrioridad(this.objPrioridad).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Prioridad',
              'La Prioridad ' + this.objPrioridad.pri_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectPrioridad();
          } else {
            Swal.close();
            Swal.fire(
              'Prioridad',
              'La Prioridad ' + this.objPrioridad.pri_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
      } else {
        this.prioridadService.actualizarPrioridad(this.objPrioridad).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Prioridad',
              'Los datos del la Prioridad ' + this.objPrioridad.pri_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm();
            this.selectPrioridad();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarDataPrioridad(IDCanal: number, stCanal: string) {
    this.boBand = false;
    this.IDPrioridad = IDCanal; // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.inputPri = stCanal;
  }

  resetForm() {
    this.inputPri = '';
    this.boBand = true;
    document.getElementById('txtPrioridad').focus();
  }

  // FILTRO TABLA
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
