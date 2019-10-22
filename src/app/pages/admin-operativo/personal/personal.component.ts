import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

// COMPLEMENTOS
import { Complementos } from 'src/app/complementos';

// ENTIDADES
import { Personal, IPersonal } from '../../../_entities/personal.entities';

// SERVICIOS
import { AreaServicioService } from '../../../services/area-servicio.service';
import { SelectService } from '../../../services/select-service.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html'
})
export class PersonalComponent implements OnInit {

  frmPersonal: FormGroup;
  objPer: Personal;
  objIDPer: any;
  boBand = true;
  IDPersonal: number;

  // NG MODEL
  inputDNI: number;
  inputCUIL: number;
  inputNombre: string;
  inputApellido: string;
  inputTelefono: string;

  // TABLA
  displayedColumns = [
    'per_dni',
    'per_nombreCompleto',
    'per_telefono',
    'Editar'
  ];
  dataSource: MatTableDataSource<IPersonal>;
  lstPersonal: IPersonal[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private personalService: AreaServicioService,
              private complemento: Complementos,
              private selectService: SelectService) { }

  ngOnInit() {
    this.frmPersonal = this.formBuilder.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    this.selectPersonal();
  }

  selectPersonal() {
    this.selectService.selectEntitie('AreaServicioController', 'SelectPersonal').subscribe(data => {
      this.lstPersonal = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IPersonal>(this.lstPersonal);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmPersonal.controls;
  }

  registrarPersonal(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objPer = new Personal();
      this.objPer.per_IDPersonal = (boBand) ? 0 : this.IDPersonal;
      this.objPer.per_dni = this.inputDNI;
      this.objPer.per_nombre = this.inputNombre;
      this.objPer.per_apellido = this.inputApellido;
      this.objPer.per_telefono = +this.inputTelefono;

      if (boBand) {
        this.personalService.registrarPersonal(this.objPer).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Personal',
              'El Empleado ' + this.objPer.per_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectPersonal();
          } else {
            Swal.close();
            Swal.fire(
              'Personal',
              'El Empleado ' + this.objPer.per_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
      } else {
        this.personalService.actualizarPersonal(this.objPer).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Personal',
              'Los datos del Empleado ' + this.objPer.per_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm();
            this.selectPersonal();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectDataPersonal(IDPer: number, stArServ: string) {
    this.boBand = false;
    this.IDPersonal = IDPer; // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS

    this.objIDPer = {
      arServ_IDPersonal: IDPer
    };

    this.personalService.selectDataPersonal(this.objIDPer).subscribe(data => {
      const dataPer: Personal = JSON.parse(data);

      this.inputDNI = dataPer.per_dni;
      this.inputNombre = dataPer.per_nombre;
      this.inputApellido = dataPer.per_apellido;
      this.inputTelefono = dataPer.per_telefono.toString();
      // FIJARSE POR ID AREA SERVICIO
    });
  }

  resetForm() {
    this.frmPersonal.reset();
    this.boBand = true;
    document.getElementById('inputDNI').focus();
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
