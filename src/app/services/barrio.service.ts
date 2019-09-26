import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Barrio } from '../_entities/barrio.entities';

@Injectable({
    providedIn: 'root'
})
export class BarrioService {

    constructor(private httpClient: HttpClient) {}

    selectBarrio(): Observable<string> {
      return this.httpClient.get<string>(`${ environment.apiUrl }api/BarrioController/SelectBarrio`);
    }

    registrarBarrio(objBarrio: Barrio): Observable<Barrio> {
        return this.httpClient.post<Barrio>(`${ environment.apiUrl }api/BarrioController/RegistrarBarrio`, objBarrio);
    }

    actualizarBarrio(objBarrio: Barrio): Observable<Barrio> {
        return this.httpClient.post<Barrio>(`${ environment.apiUrl }api/BarrioController/ActualizarBarrio`, objBarrio);
    }
}
