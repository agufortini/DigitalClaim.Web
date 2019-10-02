import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Prioridad } from '../_entities/Prioridad.entities';

@Injectable({
    providedIn: 'root'
})
export class PrioridadService {

    constructor(private httpClient: HttpClient) {}

    selectPrioridad(): Observable<string> {
      return this.httpClient.get<string>(`${environment.apiUrl}api/PrioridadController/SelectPrioridad`);
    }

    registrarPrioridad(objPrioridad: Prioridad): Observable<Prioridad> {
        return this.httpClient.post<Prioridad>(`${environment.apiUrl}api/PrioridadController/RegistrarPrioridad`, objPrioridad);
    }

    actualizarPrioridad(objPrioridad: Prioridad): Observable<Prioridad> {
        return this.httpClient.post<Prioridad>(`${environment.apiUrl}api/PrioridadController/ActualizarPrioridad`, objPrioridad);
    }
}
