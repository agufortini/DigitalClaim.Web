import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

// ENTIDADES
import { Barrio } from '../../../_entities/barrio.entities';
import { IBarrio } from '../../../_entities/barrio.entities';

// SERVICIOS
import { SelectService } from '../../../services/select-service.service';
import { BarrioService } from '../../../services/barrio.service';

@Component({
  selector: 'app-barrio',
  templateUrl: './barrio.component.html'
})
export class BarrioComponent implements OnInit {

  frmBarrio: FormGroup;
  objBarrio: Barrio;
  inputBarrio = '';
  boBand = true;
  IDBarrio: number;

  // TABLA
  displayedColumns = [
    'bar_nombre',
    'Editar'
  ];
  dataSource: MatTableDataSource<IBarrio>;
  lstBarrio: IBarrio[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private selectService: SelectService,
              private barrioService: BarrioService) { }

  ngOnInit() {
    this.frmBarrio = this.formBuilder.group({
      nombre: ['', Validators.required]
    });

    this.selectBarrio();
  }

  selectBarrio() {
    this.selectService.selectEntitie('BarrioController', 'SelectBarrio').subscribe(data => {
      this.lstBarrio = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IBarrio>(this.lstBarrio);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmBarrio.controls;
  }

  registrarBarrio(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objBarrio = new Barrio();
      this.objBarrio.bar_IDBarrio = (boBand) ? 0 : this.IDBarrio;
      this.objBarrio.bar_nombre = this.f.nombre.value;

      if (boBand) {
        this.barrioService.registrarBarrio(this.objBarrio).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Barrio',
              'El Barrio ' + this.objBarrio.bar_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectBarrio();
          } else {
            Swal.close();
            Swal.fire(
              'Barrio',
              'El Barrio ' + this.objBarrio.bar_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
      } else {
        this.barrioService.actualizarBarrio(this.objBarrio).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Barrio',
              'Los datos del Barrio ' + this.objBarrio.bar_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm();
            this.selectBarrio();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarDataBarrio(IDBarrio: number, stBarrio: string) {
    this.boBand = false;
    this.IDBarrio = IDBarrio; // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.inputBarrio = stBarrio;
  }

  resetForm() {
    this.inputBarrio = '';
    this.boBand = true;
    document.getElementById('txtBarrio').focus();
  }

  // FILTRO TABLA
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
