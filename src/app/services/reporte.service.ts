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

}
