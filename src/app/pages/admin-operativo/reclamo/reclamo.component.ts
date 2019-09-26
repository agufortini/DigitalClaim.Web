import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

// ENTIDADES
import { ITipoReclamo } from '../../../_entities/reclamo.entities';

// SERVICIOS
import { SelectService } from '../../../services/select-service.service';
import { Usuario } from '../../../_entities/usuario.entities';
import Swal from 'sweetalert2';
import { TipoReclamo } from '../../../_entities/ddl.entities';
import { AreaServicioService } from '../../../services/area-servicio.service';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.component.html',
  styleUrls: ['./reclamo.component.css']
})
export class ReclamoComponent implements OnInit {

  frmTipoReclamo: FormGroup;
  user: Usuario;
  objIDArServ: any;
  arrPrioridad: any;
  objTipRec: TipoReclamo;

  // TABLA
  displayedColumns = [
    'tipRec_IDTipoReclamo',
    'tipRec_nombre',
    'Actualizar'
  ];
  dataSource: MatTableDataSource<ITipoReclamo>;
  lstTipoReclamo: ITipoReclamo[];
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private formBuilder: FormBuilder,
              private selectService: SelectService,
              private areaServicioService: AreaServicioService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.frmTipoReclamo = this.formBuilder.group({
      nombre: ['', Validators.required],
      prioridad: ['', Validators.required]
    });

    this.selectTipoReclamo();

    this.selectService.selectEntitie('TipoReclamoController', 'SelectPrioridad').subscribe(data => {
      this.arrPrioridad = JSON.parse(data);
    });
  }

  selectTipoReclamo() {
    this.objIDArServ = {
      tipRec_IDArServ: this.user.usu_IDAreaServicio
    };

    this.selectService.selectTipoReclamo(this.objIDArServ).subscribe(data => {
      this.lstTipoReclamo = JSON.parse(data);
      this.dataSource = new MatTableDataSource<ITipoReclamo>(this.lstTipoReclamo);
      // this.dataSource.paginator = this.paginator;
    });
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmTipoReclamo.controls;
  }

  registrarTipoReclamo() {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.objTipRec = new TipoReclamo();
      this.objTipRec.tipRec_nombre = this.f.nombre.value;
      this.objTipRec.tipRec_IDAreaServicio = this.user.usu_IDAreaServicio;
      this.objTipRec.tipRec_IDPrioridad = this.f.prioridad.value;

      this.areaServicioService.registrarTipoReclamo(this.objTipRec).subscribe(data => {
          if (data) {
            Swal.close();
            Swal.fire(
              'Tipo de Reclamo',
              'El Tipo de Reclamo ' + this.objTipRec.tipRec_nombre + ' se registró correctamente.',
              'success'
            );

            this.resetForm();
            this.selectTipoReclamo();
          } else {
            Swal.close();
            Swal.fire(
              'Tipo de Reclamo',
              'El Tipo de Reclamo ' + this.objTipRec.tipRec_nombre + ' ya existe.',
              'warning'
            );

            this.resetForm();
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  clearNombre() {
    this.frmTipoReclamo.reset({
      nombre: ''
    });

    document.getElementById('btnClear').focus();
  }

  clearPrioridad() {
    this.frmTipoReclamo.reset({
      prioridad: ''
    });
  }

  resetForm() {
    this.frmTipoReclamo.reset({
      nombre: '',
      prioridad: ''
    });

    document.getElementById('btnClear').focus();
  }

}
