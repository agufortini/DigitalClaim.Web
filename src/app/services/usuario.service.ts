import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Usuario } from '../_entities/usuario.entities';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  validarUsuario(objUser: any): Observable<any> {
    return this.httpClient.get<any>(`${ environment.apiUrl }api/UsuarioController/ValidarUsuario`, {
      params: new HttpParams().set('stObj', JSON.stringify(objUser))
    });
  }

  registrarUsuario(objUser: any): Observable<any> {
    return this.httpClient.get<any>(`${ environment.apiUrl }api/UsuarioController/RegistrarUsuario`, {
      params: new HttpParams().set('stObj', JSON.stringify(objUser))
    });
  }

  actualizarUsuario(objUser: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${ environment.apiUrl }api/UsuarioController/ActualizarUsuario`, objUser);
  }

  selectDataUsuario(objIDUser: any): Observable<any> {
    return this.httpClient.get<any>(`${ environment.apiUrl }api/UsuarioController/SelectDataUsuario`, {
        params: new HttpParams().set('stObj', JSON.stringify(objIDUser))
    });
  }
}
