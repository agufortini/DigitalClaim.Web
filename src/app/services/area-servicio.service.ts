import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AreaServicio } from '../_entities/area-servicio.entities';
import { TipoReclamo } from '../_entities/ddl.entities';

@Injectable({
    providedIn: 'root'
})
export class AreaServicioService {

    constructor(private httpClient: HttpClient) {}

    registrarAreaServicio(objArServ: AreaServicio): Observable<AreaServicio> {
        return this.httpClient.post<AreaServicio>(`${ environment.apiUrl }api/AreaServicioController/RegistrarAreaServicio`, objArServ);
    }

    registrarTipoReclamo(objTipRec: TipoReclamo): Observable<TipoReclamo> {
        return this.httpClient.post<TipoReclamo>(`${ environment.apiUrl }api/TipoReclamoController/RegistrarTipoReclamo`, objTipRec);
    }

    selectDataAreaServicio(objIDArServ: any): Observable<any> {
        return this.httpClient.get<any>(`${ environment.apiUrl }api/AreaServicioController/SelectDataAreaServicio`, {
            params: new HttpParams().set('stObj', JSON.stringify(objIDArServ))
        });
    }

    actualizarAreaServicio(objArServ: AreaServicio): Observable<AreaServicio> {
        return this.httpClient.post<AreaServicio>(`${ environment.apiUrl }api/AreaServicioController/ActualizarAreaServicio`, objArServ);
    }
}
