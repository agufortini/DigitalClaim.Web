import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

// ENTIDADES
import { OrdenServicio, DetalleOrdServ } from '../_entities/orden-servicio.entities';
import { PersonalOrdServ } from '../_entities/personal-por-orden-servicio.entities';
import { EstadoOrdenServicio } from '../_entities/orden-servicio.entities';

@Injectable({
    providedIn: 'root'
})

export class OrdenServicioService {

    constructor(private httpClient: HttpClient) { }

    listarOrdServ(IDAreaServicio: number) {
        return this.httpClient.post<any>(`${environment.apiUrl}api/OrdenServicioController/SelectOrdenServicio`, IDAreaServicio);
    }

    registrarOrdenServicio(objOrdServ: OrdenServicio): Observable<OrdenServicio> {
        return this.httpClient.post<OrdenServicio>(`${environment.apiUrl}api/OrdenServicioController/RegistrarOrdenServicio`, objOrdServ);
    }

    registrarDetalleOrdenServicio(arrDetalle: DetalleOrdServ[]): Observable<DetalleOrdServ[]> {
        return this.httpClient.post<DetalleOrdServ[]>(`${environment.apiUrl}api/OrdenServicioController/RegistrarDetalleOrdenServicio`, arrDetalle);
    }

    registrarPersonalPorOrden(arrPersonal: PersonalOrdServ[]): Observable<PersonalOrdServ[]> {
        return this.httpClient.post<PersonalOrdServ[]>(`${environment.apiUrl}api/OrdenServicioController/RegistrarPersonalOrdenServicio`, arrPersonal);
    }

    /* -------------------------------------------- ESTADO ORDEN SERVICIO -------------------------------------------- */
    registrarEstadoOrdenServicio(objEstadoOrdenServicio: EstadoOrdenServicio): Observable<EstadoOrdenServicio> {
        return this.httpClient.post<EstadoOrdenServicio>(`${environment.apiUrl}api/OrdenServicioController/RegistrarEstadoOrdenServicio`, objEstadoOrdenServicio);
    }

    actualizarEstadoOrdenServicio(objEstadoOrdenServicio: EstadoOrdenServicio): Observable<EstadoOrdenServicio> {
        return this.httpClient.post<EstadoOrdenServicio>(`${environment.apiUrl}api/OrdenServicioController/ActualizarEstadoOrdenServicio`, objEstadoOrdenServicio);
    }
}
