import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// ENTITIES
import { Usuario, SesionUsuario } from 'src/app/_entities/usuario.entities';

// SERVICIOS
import { ReclamoService } from '../../services/reclamo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  user: Usuario;
  mensaje = '¿No sabés como realizar tu reclamo? ingresá a la sección de Ayuda en el menú lateral.';
  result: any;

  constructor(private reclamoService: ReclamoService,
              private snackBar: MatSnackBar) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('ayuda'))) {
      this.ayudaUsuario();
    }
  }

  ayudaUsuario() {
    this.result =  this.snackBar.open(this.mensaje, 'OK', {
      duration: 5000,
    });
    localStorage.setItem('ayuda', JSON.stringify(false));
  }
}
