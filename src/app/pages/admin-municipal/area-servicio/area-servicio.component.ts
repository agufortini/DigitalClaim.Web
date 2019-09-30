import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

// COMPLEMENTOS
import { Complementos } from 'src/app/complementos';

// ENTIDADES
import { AreaServicio, IAreaServicio } from '../../../_entities/area-servicio.entities';

// SERVICIOS
import { AreaServicioService } from '../../../services/area-servicio.service';
import { SelectService } from '../../../services/select-service.service';

@Component({
  selector: 'app-area-servicio',
  templateUrl: './area-servicio.component.html'
})
export class AreaServicioComponent implements OnInit {

  frmAreaServicio: FormGroup;
  objArServ: AreaServicio;
  objIDArServ: any;
  boBand = true;
  IDAreaServicio: number;

  // NG MODEL
  inputCUIT: number;
  inputNombre: string;
  inputPass: string;
  inputDomicilio: string;
  inputTel: number;
  inputEmail: string = null;

    // TABLA
    displayedColumns = [
      'arServ_nombre',
      'Editar'
    ];
    dataSource: MatTableDataSource<IAreaServicio>;
    lstAreaServicio: IAreaServicio[];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
              private areaServicioService: AreaServicioService,
              private complemento: Complementos,
              private selectService: SelectService) { }

  ngOnInit() {
    this.frmAreaServicio = this.formBuilder.group({
      cuit: ['', Validators.required],
      nombre: ['', Validators.required],
      domicilio: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['']
    });

    this.selectAreaServicio();
    console.log(this.lstAreaServicio);
  }

  selectAreaServicio() {
    this.selectService.selectEntitie('AreaServicioController', 'SelectAreaServicio').subscribe(data => {
      this.lstAreaServicio = JSON.parse(data);
      this.dataSource = new MatTableDataSource<IAreaServicio>(this.lstAreaServicio);
      this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmAreaServicio.controls;
  }

  registrarAreaServicio(boBand: boolean) {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objArServ = new AreaServicio();
      this.objArServ.arServ_IDAreaServicio = (boBand) ? 0 : this.IDAreaServicio;
      this.objArServ.arServ_cuit = this.inputCUIT;
      this.objArServ.arServ_nombre = this.inputNombre;
      this.objArServ.arServ_domicilioFiscal = this.inputDomicilio;
      this.objArServ.arServ_telefono = this.inputTel;
      this.objArServ.arServ_email = this.inputEmail;

      if (boBand) {
        this.areaServicioService.registrarAreaServicio(this.objArServ).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Area de Servicio',
              'El Area de Servicio ' + this.objArServ.arServ_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectAreaServicio();
          } else {
            Swal.close();
            Swal.fire(
              'Area de Servicio',
              'El Area de Servicio ' + this.objArServ.arServ_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
      } else {
        this.areaServicioService.actualizarAreaServicio(this.objArServ).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Area de Servicio',
              'Los datos del Area de Servicio ' + this.objArServ.arServ_nombre + ' se actualizaron correctamente.',
              'success'
            );

            this.resetForm();
            this.selectAreaServicio();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectDataArServ(IDArServ: number, stArServ: string) {
    this.boBand = false;
    // ESTA VARIABLE LE ASIGNO EL IDUSUARIO PARA LUEGO PODER HACER LA ACTUALIZACIÓN DE LOS DATOS
    this.IDAreaServicio = IDArServ;

    this.objIDArServ = {
      arServ_IDAreaServicio: IDArServ
    };

    this.areaServicioService.selectDataAreaServicio(this.objIDArServ).subscribe(data => {
      const dataArServ: AreaServicio = JSON.parse(data);

      this.inputCUIT = dataArServ.arServ_cuit;
      this.inputNombre = stArServ;
      this.inputDomicilio = dataArServ.arServ_domicilioFiscal;
      this.inputTel = dataArServ.arServ_telefono;
      this.inputEmail = dataArServ.arServ_email;
    });
  }

  resetForm() {
    this.frmAreaServicio.reset({
      cuit: '',
      nombre: '',
      domicilio: '',
      telefono: '',
      email: ''
    });

    this.boBand = true;
    document.getElementById('inputCUIT').focus();
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
