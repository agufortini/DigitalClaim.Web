import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';

// ENTIDADES
import { Rol, IRol } from '../../../_entities/rol.entities';

// ROLES
import { SelectService } from 'src/app/services/select-service.service';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styles: []
})
export class RolComponent implements OnInit {

  frmRol: FormGroup;
  objRol: Rol;
  inputRol = '';
  boBand = true;
  IDRol: number;

  // TABLA
  displayedColumns = [
    'rol_nombre',
    'Editar'
  ];
  dataSource: MatTableDataSource<IRol>;
  lstRol: IRol[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private selectService: SelectService,
              private rolService: RolService) { }

  ngOnInit() {
    this.frmRol = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    this.selectRol();
  }

  selectRol() {
    this.selectService.selectEntitie('RolController', 'SelectRol').subscribe(data => {
      this.lstRol = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IRol>(this.lstRol);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmRol.controls;
  }

  registrarRol(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objRol = new Rol();
      this.objRol.rol_IDRol = (boBand) ? 0 : this.IDRol;
      this.objRol.rol_nombre = this.f.nombre.value;

      if (boBand) {
        this.rolService.registrarRol(this.objRol).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Rol',
              'El Rol ' + this.objRol.rol_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectRol();
          } else {
            Swal.close();
            Swal.fire(
              'Rol',
              'El Rol ' + this.objRol.rol_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
      } else {
        this.rolService.actualizarRol(this.objRol).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Rol',
              'Los datos del Rol ' + this.objRol.rol_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm();
            this.selectRol();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarDataRol(IDRol: number, stRol: string) {
    this.boBand = false;
    this.IDRol = IDRol; // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.inputRol = stRol;
  }

  resetForm() {
    this.inputRol = '';
    this.boBand = true;
    document.getElementById('txtRol').focus();
  }

  // FILTRO TABLA
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
