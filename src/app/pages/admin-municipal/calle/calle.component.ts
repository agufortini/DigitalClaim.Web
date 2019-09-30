import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

// ENTIDADES
import { Calle, ICalle } from '../../../_entities/calle.entities';

// SERVICIOS
import { SelectService } from '../../../services/select-service.service';
import { CalleService } from '../../../services/calle.service';
import { ReclamoService } from '../../../services/reclamo.service';

@Component({
  selector: 'app-calle',
  templateUrl: './calle.component.html',
  styles: []
})
export class CalleComponent implements OnInit {

  frmCalle: FormGroup;
  objCalle: Calle;
  inputCalle = '';
  selectBar: any;
  boBand = true;
  IDCalle: number;
  arrBarrio: any;
  lstBarrio: any[] = [];

  // TABLA
  displayedColumns = [
    'cal_nombre',
    'Editar'
  ];
  dataSource: MatTableDataSource<ICalle>;
  lstCalle: ICalle[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private selectService: SelectService,
              private calleService: CalleService,
              private reclamoService: ReclamoService) { }

  ngOnInit() {
    this.frmCalle = this.formBuilder.group({
      nombre: ['', Validators.required],
      barrio: ['', Validators.required]
    });

    this.selectCalle();
    this.selectBarrio();
  }

  selectCalle() {
    this.selectService.selectEntitie('CalleController', 'SelectCalle').subscribe(data => {
      this.lstCalle = JSON.parse(data);
      this.dataSource = new MatTableDataSource<ICalle>(this.lstCalle);
      this.dataSource.paginator = this.paginator;
    });
  }

  selectBarrio() {
    this.selectService.selectEntitie('BarrioController', 'SelectBarrio').subscribe(data => {
      this.arrBarrio = JSON.parse(data);
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmCalle.controls;
  }

  registrarCalle(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objCalle = new Calle();
      this.objCalle.cal_IDCalle = (boBand) ? 0 : this.IDCalle;
      this.objCalle.cal_nombre = this.f.nombre.value;

      if (boBand) {
        this.calleService.registrarCalle(this.objCalle).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Calle',
              'La Calle ' + this.objCalle.cal_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm('');
            this.selectCalle();
          } else {
            Swal.close();
            Swal.fire(
              'Calle',
              'La Calle ' + this.objCalle.cal_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm('');
          }
        });
      } else {
        this.calleService.actualizarCalle(this.objCalle).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Calle',
              'Los datos de la Calle ' + this.objCalle.cal_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm('');
            this.selectCalle();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  mostrarDataCalle(IDCalle: number, stCalle: string) {
    this.boBand = false;
    this.IDCalle = IDCalle; // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.inputCalle = stCalle;

    const objCalle = {
      cal_nombre: stCalle
    };

    this.reclamoService.selectBarrioPorCalle(objCalle).subscribe(data => {
      this.selectBar = JSON.parse(data);
    });
  }

  resetForm(stValue: string) {
    if (stValue === 'calle') {
      this.inputCalle = '';
    } else if (stValue === 'barrio') {
      this.selectBar = '';
    } else {
      this.inputCalle = '';
      this.selectBar = '';
    }

    this.boBand = true;
    document.getElementById('txtCalle').focus();
  }

  // FILTRO TABLA
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
