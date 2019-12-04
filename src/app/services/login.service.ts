import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { RecuperarPassword } from '../_entities/usuario.entities';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  login(objSesionUsuario: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/LoginController/ValidarSesion`, {
      params: new HttpParams().set('stObj', JSON.stringify(objSesionUsuario))
    });
  }

  registrarCierreSesion(objSesionUsuario: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/LoginController/RegistrarSesionUsuario`, {
      params: new HttpParams().set('stObj', JSON.stringify(objSesionUsuario))
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  recuperarPassword(objRecuperarPass: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/LoginController/RecuperarPassword`, { 
      params: new HttpParams().set('stObj', JSON.stringify(objRecuperarPass))
    });
  }

  /* LOGIN GUARD */
  estaAutenticado(): boolean {

    const storage = localStorage.getItem('currentUser');

    if (storage != null) {
      return true;
    } else {
      return false;
    }

  }

}
