import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RatingReclamoComponent } from '../rating/rating-reclamo/rating-reclamo.component';

// ENTIDADES
import { Usuario } from '../../_entities/usuario.entities';
import { SelectRating } from '../../_entities/reclamo.entities';

// SERIVICIOS
import { ReclamoService } from '../../services/reclamo.service';
import { ModalRatingComponent } from '../modal-rating/modal-rating.component';

@Component({
  selector: 'app-modal-estadoreclamo',
  templateUrl: './modal-estadoreclamo.component.html',
  styleUrls: ['./modal-estadoreclamo.component.css']
})
export class ModalEstadoreclamoComponent implements OnInit {
  user: Usuario;
  IDReclamo: number;
  lstDatos: any;
  dataSource: MatTableDataSource<any>;
  objIDRec: any;
  dataRating: any;

  // Variable utilizada para saber si existe o no un rating registrado
  rating: boolean;

  // Variable utilizada para habilitar el botón que permite registrar un rating
  btnCalificar: boolean;

  displayedColumns: string[] = [
    'his_fechaIngreso',
    'his_horaIngreso',
    'his_observaciones',
    'estRec_nombre'
  ];


  constructor(private dialogRef: MatDialogRef<ModalEstadoreclamoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private reclamoService: ReclamoService,
              private dialog: MatDialog,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // Se almacena el IDReclamo capturado al presionar botón "Ver", para luego hacer la búsqueda del detalle del reclamo en base a este ID en "selectHistorial"
    this.IDReclamo = this.data.obj.rec_ID;
  }

  ngOnInit() {
    try {
      this.selectHistorial();
    } catch (error) {
      console.log(error);
    }
  }

  // METODO DE BUSQUEDA DE DETALLE DE RECLAMO
  selectHistorial() {
    this.objIDRec = {
      rec_IDReclamo: this.IDReclamo
    };

    this.reclamoService.selectHistorial(this.objIDRec).subscribe(data => {
      this.lstDatos = JSON.parse(data);
      this.dataSource = new MatTableDataSource<any>(this.lstDatos);

      // Validación para saber si está el reclamo en estado cumplido y habilitar el boton para registrar rating
      const fila = this.lstDatos.length;

      // Pregunta si el estado del reclamo es cumplido, y habilita el boton para registrar rating
      this.btnCalificar = (this.lstDatos[fila - 1].estRec_nombre === 'Cumplido') ? true : false;

      

      // En caso de que el reclamo esté en estado "Cumplido", se llama al método para verificar si tiene o no un rating ya registrado
      this.selectRating();
    });
  }
  
  // METODO DE BUSQUEDA DE RATING DE RECLAMO
  selectRating() {
    this.reclamoService.selectRating(this.objIDRec).subscribe(data => {
      this.dataRating = JSON.parse(data);

      this.rating = (this.dataRating === null) ? true : false;
      
      if (this.rating === false) {
        document.getElementById('btnCalificar').textContent = 'Ver Calificación';
      }

      // if (dataRat === null) {
      //   this.rating = true;
      // } else {
      //   this.objRating = new SelectRating();
      //   this.objRating.rat_fechaAlta = dataRat.rat_fechaAlta;
      //   this.objRating.rat_rating = dataRat.rat_rating;
      //   this.objRating.rat_comentario = dataRat.rat_comentario;

      //   for (let index = 0; index < this.objRating.rat_rating; index++) {
      //     this.ratingArr.push(index);
      //   }
      // }
    });
  }

  ratingReclamo() {
    try {
      // Si el reclamo no esta calificado, habilita la modal para permitir registracion
      if (this.rating) {
        const objIDRec = {
          rec_IDReclamo: JSON.parse(localStorage.getItem('rec_IDReclamo'))
        };
  
        this.dialog.open(RatingReclamoComponent, {
          width: '50%'
        });
        this.dialogRef.close();
      } else {
        // Si el reclamo ya esta calificado, habilita la modal para mostrar el su calificacion
        localStorage.setItem('ratingReclamo', JSON.stringify(this.dataRating));
        this.dialog.open(ModalRatingComponent, {
          width: '50%'
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
