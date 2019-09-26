import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modal-calificarreclamo',
  templateUrl: './modal-calificarreclamo.component.html',
  styleUrls: ['./modal-calificarreclamo.component.css']
})
export class ModalCalificarreclamoComponent implements OnInit {

  frmCalificarReclamo: FormGroup;
  currentRate = 0;
  comentario: string;

  constructor(private dialogRef: MatDialogRef<ModalCalificarreclamoComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frmCalificarReclamo = this.formBuilder.group({
      comentario: ['']
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }

}
