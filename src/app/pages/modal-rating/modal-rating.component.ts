import { Component, OnInit } from '@angular/core';

// ENTIDADES
import { SelectRating } from 'src/app/_entities/reclamo.entities';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-rating',
  templateUrl: './modal-rating.component.html',
  styles: []
})
export class ModalRatingComponent implements OnInit {
  rat: any;
  objRating: SelectRating;
  ratingArr = [];
  
  constructor(private dialogRef: MatDialogRef<ModalRatingComponent>) {
    this.rat = JSON.parse(localStorage.getItem('ratingReclamo'));
  }

  ngOnInit() {
    try {
        this.objRating = new SelectRating();
        this.objRating.rat_fechaAlta = this.rat.rat_fechaAlta;
        this.objRating.rat_rating = this.rat.rat_rating;
        this.objRating.rat_comentario = this.rat.rat_comentario;

        for (let index = 0; index < this.objRating.rat_rating; index++) {
          this.ratingArr.push(index);
        }
    } catch (error) {
      console.log(error);
    }
  }
  
  cerrarModal() {
    this.dialogRef.close();
  }
}
