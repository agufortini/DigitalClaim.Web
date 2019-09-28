import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-calificar-reclamo',
  templateUrl: './calificar-reclamo.component.html'
})
export class CalificarReclamoComponent implements OnInit {

  frmCalificarReclamo: FormGroup;

  rating = 0;
  starCount = 5;
  starColor = 'primary';
  comentario = '';

  constructor(private dialogRef: MatDialogRef<CalificarReclamoComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frmCalificarReclamo = this.formBuilder.group({
      comentario: ['']
    });
  }

  onRatingChanged(rating) {
    console.log(rating);
    this.rating = rating;
  }

  cerrarModal() {
    this.dialogRef.close();
  }

}
