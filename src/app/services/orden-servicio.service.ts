import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

// ENTIDADES
import { OrdenServicio, DetalleOrdServ } from '../_entities/orden-servicio.entities';
import { PersonalOrdServ } from '../_entities/personal-por-orden-servicio.entities';

@Injectable({
    providedIn: 'root'
})

export class OrdenServicioService {

    constructor(private httpClient: HttpClient) { }

    listarOrdServ(IDAreaServicio: number) {
        return this.httpClient.post<any>(`${environment.apiUrl}api/OrdenServicioController/SelectOrdenServicio`, IDAreaServicio);
    }

    selectReclamosPendientes(objIDArServ: any) {
        return this.httpClient.get<any>(`${environment.apiUrl}api/OrdenServicioController/SelectReclamosPendientes`, {
            params: new HttpParams().set('stObj', JSON.stringify(objIDArServ))
        });
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
}
