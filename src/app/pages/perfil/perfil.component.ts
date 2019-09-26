import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  frmPerfil: FormGroup;
  user: any;

  constructor(private formBuilder: FormBuilder) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.frmPerfil = this.formBuilder.group({
      dni: [null, Validators.required],
      usuario: [null, Validators.required],
      password: [null, Validators.required],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      telefono: [null, Validators.required],
      email: [null, Validators.required]
    });

    
  }

}
