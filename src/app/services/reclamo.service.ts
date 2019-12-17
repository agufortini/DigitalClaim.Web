import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ENTIDADES
import { Ticket } from '../_entities/ticket.entities';
import { Historial } from '../_entities/historial.entities';
import { ReclamoPendiente, EstadoReclamo } from '../_entities/reclamo.entities';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private httpClient: HttpClient) { }

  // GENERAR Y REGISTRAR RECLAMO

  validarRealizacionReclamo(objIDUser: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/ValidarRealizacionReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objIDUser))
    });
  }

  validarReclamo(objValidarReclamo: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/ValidarReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objValidarReclamo))
    });
  }

  // POST
  registrarReclamo(objReclamo: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/RegistrarReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objReclamo))
    });
  }

  selectBarrioPorCalle(objCalle: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectBarrioPorCalle`, {
      params: new HttpParams().set('stObj', JSON.stringify(objCalle))
    });
  }

  selectCalle(objCalle: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectCalle`, {
      params: new HttpParams().set('stObj', JSON.stringify(objCalle))
    });
  }

  enviarEmailEstado(arrEmail: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/EnviarEmailEstado`, {
      params: new HttpParams().set('stObj', JSON.stringify(arrEmail))
    });
  }

  // CONSULTAR RECLAMO

  consultarReclamo(objSelect: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}api/ReclamoController/ConsultarReclamo`, objSelect);
  }

  selectReclamo(objFiltro: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objFiltro))
    });
  }

  selectReclamoSinAsignar(objIDArServ: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectReclamoSinAsignar`, {
        params: new HttpParams().set('stObj', JSON.stringify(objIDArServ))
    });
  }

  selectHistorial(stCodRec: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectHistorial`, {
      params: new HttpParams().set('stObj', JSON.stringify(stCodRec))
    });
  }

  selectReclamoPorID(objIDRec: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectReclamoPorID`, {
      params: new HttpParams().set('stObj', JSON.stringify(objIDRec))
    });
  }

  actualizarReclamo(objRec: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/ActualizarReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objRec))
    });
  }
  
  selectRating(objIDRec: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectRating`, {
      params: new HttpParams().set('stObj', JSON.stringify(objIDRec))
    });
  }

  /* -------------------------------------------- ESTADO RECLAMO -------------------------------------------- */

  registrarEstadoReclamo(objEstRec: EstadoReclamo): Observable<EstadoReclamo> {
    return this.httpClient.post<EstadoReclamo>(`${environment.apiUrl}api/ReclamoController/RegistrarEstadoReclamo`, objEstRec);
  }

  actualizarEstadoReclamo(objEstRec: EstadoReclamo): Observable<EstadoReclamo> {
    return this.httpClient.post<EstadoReclamo>(`${environment.apiUrl}api/ReclamoController/ActualizarEstadoReclamo`, objEstRec);
  }
}
