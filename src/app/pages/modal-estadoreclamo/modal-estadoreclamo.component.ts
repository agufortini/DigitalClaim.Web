import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RatingReclamoComponent } from '../rating/rating-reclamo/rating-reclamo.component';

// ENTIDADES
import { Usuario } from '../../_entities/usuario.entities';

// SERIVICIOS
import { ReclamoService } from '../../services/reclamo.service';

@Component({
  selector: 'app-modal-estadoreclamo',
  templateUrl: './modal-estadoreclamo.component.html',
  styleUrls: ['./modal-estadoreclamo.component.css']
})
export class ModalEstadoreclamoComponent implements OnInit {
  displayedColumns: string[] = [
    'his_fechaIngreso',
    'his_horaIngreso',
    'his_observaciones',
    'estRec_nombre'
  ];

  user: Usuario;
  codRec: number;
  lstDatos: any;
  dataSource: MatTableDataSource<any>;
  objCodRec: any;

  constructor(private dialogRef: MatDialogRef<ModalEstadoreclamoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private reclamoService: ReclamoService,
              private dialog: MatDialog,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.codRec = this.data.obj.rec_codigo;
  }

  ngOnInit() {
    try {
      this.selectHistorial();
    } catch (error) {
      console.log(error);
    }
  }

  selectHistorial() {
    this.objCodRec = {
      stCodRec: this.codRec
    };

    this.reclamoService.selectHistorial(this.objCodRec).subscribe(data => {
      this.lstDatos = JSON.parse(data);
      this.dataSource = new MatTableDataSource<any>(this.lstDatos);
    });
  }

  ratingReclamo() {
    try {
      const objIDRec = {
        rec_IDReclamo: JSON.parse(localStorage.getItem('rec_IDReclamo'))
      };

      console.log(JSON.parse(localStorage.getItem('rec_IDReclamo')));
      console.log(objIDRec);

      this.reclamoService.validarRating(objIDRec).subscribe(data => {
        if (JSON.parse(data) === null) {
          this.dialog.open(RatingReclamoComponent, {
            width: '50%'
          });
          this.dialogRef.close();
        } else {
          Swal.fire({
            allowOutsideClick: false,
            type: 'warning',
            title: 'Calificar Reclamo',
            text: 'No puede calificar el reclamo ya que ya ha sido calificado con anterioridad'
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
