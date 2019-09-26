import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;

  constructor(private loginService: LoginService, private router: Router) { }

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
        this.loginService.logout();
      }
    });
  }
}
