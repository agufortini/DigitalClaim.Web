import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

import { LoginService } from '../../services/login.service';
import { SesionUsuario } from 'src/app/_entities/usuario.entities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  user: SesionUsuario;
  fechaActual: any;
  horas: string;
  minutos: string;
  getHour = new Date();
  getMin = new Date();

  constructor(private loginService: LoginService,
              private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user.su_IDRol !== 1) {
      document.getElementById('btnDigitalClaim').classList.add('disabled-link');
    }
  }

  cerrarSesion() {
    Swal.fire({
      title: '¿Seguro desea salir?',
      text:
        'Presione "Salir" a continuación si desea salir de su sesión actual.',
      type: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        // Se inicializan los campos relacionados a fecha, hora y minutos
        this.horas = ((this.getHour.getHours() < 10 ? '0' : '') + this.getHour.getHours()).toString();
        this.minutos = ((this.getMin.getMinutes() < 10 ? '0' : '') + this.getMin.getMinutes()).toString();
        this.fechaActual = new Date();
        this.user.su_fechaFin = this.datePipe.transform(this.fechaActual, 'dd/MM/yyyy');
        this.user.su_horaFin = this.horas + ':' + this.minutos;

        this.loginService.registrarCierreSesion(this.user);
        this.loginService.logout();
      }
    });
  }
}
