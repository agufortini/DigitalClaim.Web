import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Calle } from '../_entities/calle.entities';

@Injectable({
    providedIn: 'root'
})
export class CalleService {

    constructor(private httpClient: HttpClient) {}

    selectCalle(): Observable<string> {
      return this.httpClient.get<string>(`${environment.apiUrl}api/CalleController/SelectCalle`);
    }

    registrarCalle(objCalle: Calle): Observable<Calle> {
        return this.httpClient.post<Calle>(`${environment.apiUrl}api/CalleController/RegistrarCalle`, objCalle);
    }

    actualizarCalle(objCalle: Calle): Observable<Calle> {
        return this.httpClient.post<Calle>(`${environment.apiUrl}api/CalleController/ActualizarCalle`, objCalle);
    }
}
