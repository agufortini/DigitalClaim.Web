import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

// ENTIDADES
import { Canal, ICanal } from '../../../_entities/canal.entities';

// SERVICIOS
import { SelectService } from 'src/app/services/select-service.service';
import { CanalService } from '../../../services/canal.service';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.css']
})
export class CanalComponent implements OnInit {

  frmCanal: FormGroup;
  objCanal: Canal;
  inputCanal = '';
  boBand = true;
  IDCanal: number;

  // TABLA
  displayedColumns = [
    'can_IDCanal',
    'can_nombre',
    'Editar'
  ];
  dataSource: MatTableDataSource<ICanal>;
  lstCanal: ICanal[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private selectService: SelectService,
              private canalService: CanalService) { }

  ngOnInit() {
    this.frmCanal = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    this.selectCanal();
  }

  selectCanal() {
    this.selectService.selectEntitie('CanalController', 'SelectCanal').subscribe(data => {
      this.lstCanal = JSON.parse(data);
      this.dataSource = new MatTableDataSource<ICanal>(this.lstCanal);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmCanal.controls;
  }

  registrarCanal(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objCanal = new Canal();
      this.objCanal.can_IDCanal = (boBand) ? 0 : this.IDCanal;
      this.objCanal.can_nombre = this.f.nombre.value;

      if (boBand) {
        this.canalService.registrarCanal(this.objCanal).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Canal',
              'El Canal ' + this.objCanal.can_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectCanal();
          } else {
            Swal.close();
            Swal.fire(
              'Canal',
              'El Canal ' + this.objCanal.can_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
      } else {
        this.canalService.actualizarCanal(this.objCanal).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Canal',
              'Los datos del Canal ' + this.objCanal.can_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm();
            this.selectCanal();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarDataCanal(IDCanal: number, stCanal: string) {
    this.boBand = false;
    this.IDCanal = IDCanal; // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.inputCanal = stCanal;
  }

  resetForm() {
    this.inputCanal = '';
    this.boBand = true;
    document.getElementById('txtCanal').focus();
  }

  // FILTRO TABLA
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
