import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// ENTIDADES
import { Rating } from '../../../_entities/rating.entities';

// SERVICIOS
import { RatingService } from '../../../services/rating.service';

@Component({
  selector: 'app-rating-reclamo',
  templateUrl: './rating-reclamo.component.html'
})
export class RatingReclamoComponent implements OnInit {

  frmRatingReclamo: FormGroup;
  objRating: Rating;

  rating = 0;
  starCount = 5;
  starColor = 'primary';
  comentario = '';

  constructor(private dialogRef: MatDialogRef<RatingReclamoComponent>,
              private formBuilder: FormBuilder,
              private router: Router,
              private ratingService: RatingService) { }

  ngOnInit() {
    this.frmRatingReclamo = this.formBuilder.group({
      comentario: ['']
    });
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
  }

  // OBTENCIÓN DE LOS CONTROLES DEL FORMULARIO
  get f() {
    return this.frmRatingReclamo.controls;
  }

  registrarRating() {
    try {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });

      Swal.showLoading();

      this.objRating = new Rating();
      this.objRating.rat_rating = this.rating;
      this.objRating.rat_comentario = this.f.comentario.value;

      this.ratingService.registrarRating(this.objRating).subscribe(data => {
        if (+data === 1) {
          Swal.close();
          Swal.fire({
            allowOutsideClick: false,
            type: 'success',
            title: 'Calificar Reclamo',
            text: 'El reclamo ha sido calificado correctamente. Gracias por su colaboración'
          }).then(result => {
            if (result.value) {
              this.router.navigateByUrl('/home');
            }
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
