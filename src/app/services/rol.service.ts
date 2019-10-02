import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Rol } from '../_entities/Rol.entities';

@Injectable({
    providedIn: 'root'
})
export class RolService {

    constructor(private httpClient: HttpClient) {}

    selectRol(): Observable<string> {
      return this.httpClient.get<string>(`${environment.apiUrl}api/RolController/SelectRol`);
    }

    registrarRol(objRol: Rol): Observable<Rol> {
        return this.httpClient.post<Rol>(`${environment.apiUrl}api/RolController/RegistrarRol`, objRol);
    }

    actualizarRol(objRol: Rol): Observable<Rol> {
        return this.httpClient.post<Rol>(`${environment.apiUrl}api/RolController/ActualizarRol`, objRol);
    }
}
