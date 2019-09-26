import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ENTIDADES
import { Ticket } from '../_entities/ticket.entities';
import { Historial } from '../_entities/historial.entities';
import { Contacto } from '../_entities/contacto.entities';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private httpClient: HttpClient) { }

  // GENERAR Y REGISTRAR RECLAMO

  // validarRealizacionReclamo(objIDUser: any): Observable<any> {
  //   return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/ValidarRealizacionReclamo`, {
  //     params: new HttpParams().set('stObj', JSON.stringify(objIDUser))
  //   });
  // }

  validarReclamo(objValidarReclamo: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/ValidarReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objValidarReclamo))
    });
  }

  // POST
  registrarTicket(objTicket: Ticket): Observable<Ticket> {
    return this.httpClient.get<Ticket>(`${environment.apiUrl}api/ReclamoController/RegistrarTicket`, {
      params: new HttpParams().set('stObj', JSON.stringify(objTicket))
    });
  }

  selectCallePorBarrio(objCalBar: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectCallePorBarrio`, {
      params: new HttpParams().set('stObj', JSON.stringify(objCalBar))
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

  // POST
  registrarReclamo(objReclamo: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/RegistrarReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objReclamo)
    )});
  }

  // POST
  registrarHistorial(objHistorial: Historial): Observable<Historial> {
    return this.httpClient.get<Historial>(`${environment.apiUrl}api/ReclamoController/RegistrarHistorial`, {
      params: new HttpParams().set('stObj', JSON.stringify(objHistorial))
    });
  }

  // POST
  enviarEmailCodigo(objEnviarEmail: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/EnviarEmailCodigo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objEnviarEmail))
    });
  }

  // CONSULTAR RECLAMO

  listarReclamos(stIDUser: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/ListarReclamos`, {
      params: new HttpParams().set('stObj', JSON.stringify(stIDUser))
    });
  }

  selectReclamo(objFiltro: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReclamoController/SelectReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objFiltro))
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

  registrarConsulta(objCon: Contacto): Observable<Contacto> {
    return this.httpClient.post<Contacto>(`${ environment.apiUrl }api/ReclamoController/RegistrarConsulta`, objCon);
  }
}
