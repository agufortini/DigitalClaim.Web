import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Canal } from '../_entities/Canal.entities';

@Injectable({
    providedIn: 'root'
})
export class CanalService {

    constructor(private httpClient: HttpClient) {}

    selectCanal(): Observable<string> {
      return this.httpClient.get<string>(`${environment.apiUrl}api/CanalController/SelectCanal`);
    }

    registrarCanal(objCanal: Canal): Observable<Canal> {
        return this.httpClient.post<Canal>(`${environment.apiUrl}api/CanalController/RegistrarCanal`, objCanal);
    }

    actualizarCanal(objCanal: Canal): Observable<Canal> {
        return this.httpClient.post<Canal>(`${environment.apiUrl}api/CanalController/ActualizarCanal`, objCanal);
    }
}
