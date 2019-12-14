import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {

    if (this.loginService.estaAutenticado()) {
      return true;
    } 
    this.router.navigateByUrl('/login');
    // Swal.fire({
    //   type: 'error',
    //   title: 'Iniciar Sesión',
    //   text: 'Para iniciar sesión debe ingresar usuario y contraseña'
    // });
    return false;
  }
}
