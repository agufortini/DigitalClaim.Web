import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AreaServicio } from '../_entities/area-servicio.entities';
import { TipoReclamo } from '../_entities/ddl.entities';
import { Personal } from '../_entities/personal.entities';

@Injectable({
    providedIn: 'root'
})
export class AreaServicioService {

    constructor(private httpClient: HttpClient) {}

    selectDataAreaServicio(objIDArServ: any): Observable<any> {
        return this.httpClient.get<any>(`${ environment.apiUrl }api/AreaServicioController/SelectDataAreaServicio`, {
            params: new HttpParams().set('stObj', JSON.stringify(objIDArServ))
        });
    }

    registrarAreaServicio(objArServ: AreaServicio): Observable<AreaServicio> {
        return this.httpClient.post<AreaServicio>(`${ environment.apiUrl }api/AreaServicioController/RegistrarAreaServicio`, objArServ);
    }

    actualizarAreaServicio(objArServ: AreaServicio): Observable<AreaServicio> {
        return this.httpClient.post<AreaServicio>(`${ environment.apiUrl }api/AreaServicioController/ActualizarAreaServicio`, objArServ);
    }

    /* -------------------------------------------- TIPO RECLAMO -------------------------------------------- */

    registrarTipoReclamo(objTipRec: TipoReclamo): Observable<TipoReclamo> {
        return this.httpClient.post<TipoReclamo>(`${ environment.apiUrl }api/TipoReclamoController/RegistrarTipoReclamo`, objTipRec);
    }

    /* -------------------------------------------- PERSONAL -------------------------------------------- */

    selectPersonal(objIDArServ: any): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}api/AreaServicioController/SelectPersonal`, {
            params: new HttpParams().set('stObj', JSON.stringify(objIDArServ))
        });
    }

    registrarPersonal(objPer: Personal): Observable<Personal> {
        return this.httpClient.post<Personal>(`${ environment.apiUrl }api/AreaServicioController/RegistrarPersonal`, objPer);
    }

    actualizarPersonal(objPer: Personal): Observable<Personal> {
        return this.httpClient.post<Personal>(`${ environment.apiUrl }api/AreaServicioController/ActualizarPersonal`, objPer);
    }

    selectDataPersonal(objIDPersonal: any): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiUrl}api/AreaServicioController/SelectDataPersonal`, {
            params: new HttpParams().set('stObj', JSON.stringify(objIDPersonal))
        });
    }
}
