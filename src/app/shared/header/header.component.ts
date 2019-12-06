import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

// ENTIDADES
import { Usuario, SesionUsuario } from '../../_entities/usuario.entities';

// SERVICIOS
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  user: Usuario;
  objSesion: SesionUsuario;
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

    if (this.user.usu_IDRol !== 1) {
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
        // Se inicializa Fecha y Hora actual para registrar  Fin de Sesión de Usuario
        this.fechaActual = new Date();
        this.fechaActual = this.datePipe.transform(this.fechaActual, 'dd/MM/yyyy');
        this.horas = ((this.getHour.getHours() < 10 ? '0' : '') + this.getHour.getHours()).toString();
        this.minutos = ((this.getMin.getMinutes() < 10 ? '0' : '') + this.getMin.getMinutes()).toString();

        this.objSesion = new SesionUsuario();
        this.objSesion.su_IDSesion = this.user.usu_IDSesion;
        this.objSesion.su_fechaInicio = this.user.usu_fechaInicio;
        this.objSesion.su_horaInicio = this.user.usu_horaInicio;
        this.objSesion.su_fechaFin = this.fechaActual;
        this.objSesion.su_horaFin = this.horas + ':' + this.minutos;
        this.objSesion.su_IDUsuario = this.user.usu_IDUsuario;

        this.loginService.registrarCierreSesion(this.objSesion).subscribe(data => {
            if (JSON.parse(data) === null) {
              this.loginService.logout();
            }
        });
      }
    });
  }
}
