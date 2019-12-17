import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private httpClient: HttpClient) { }

  reportePorAreaServicio(objReporte: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReporteController/ReportePorAreaServicio`, {
      params: new HttpParams().set('stObj', JSON.stringify(objReporte))
    });
  }

  reportePorBarrio(objReporte: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReporteController/ReportePorBarrio`, {
      params: new HttpParams().set('stObj', JSON.stringify(objReporte))
    });
  }

  reportePorTipoReclamo(objReporte: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReporteController/ReportePorTipoReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objReporte))
    });
  }

  reporteReclamoPorEstado(objReporte: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReporteController/ReporteReclamoPorEstado`, {
      params: new HttpParams().set('stObj', JSON.stringify(objReporte))
    });
  }

  reporteOrdServPorEstado(objReporte: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}api/ReporteController/ReporteOrdServPorEstado`, {
      params: new HttpParams().set('stObj', JSON.stringify(objReporte))
    });
  }

}
