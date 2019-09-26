import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(private httpClient: HttpClient) { }

  selectEntitie(stController: string, urlMetodo: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}api/${stController}/${urlMetodo}`);
  }

  /* CARGAS ANIDADAS */
  selectTipoReclamo(objIDArServ: any): Observable<any> {
    return this.httpClient.get<any>(`${ environment.apiUrl }api/TipoReclamoController/SelectTipoReclamo`, {
      params: new HttpParams().set('stObj', JSON.stringify(objIDArServ))
    });
  }

  selectCalle(objIDBarrio: string): Observable<string> {
    return this.httpClient.get<string>(`${ environment.apiUrl }api/CalleController/SelectCallePorBarrio`, {
      params: new HttpParams().set('stObj', JSON.stringify(objIDBarrio))
    });
  }

  selectResponsable(objResp: any): Observable<any> {
    return this.httpClient.get<any>(`${ environment.apiUrl }api/AreaServicioController/SelectResponsable`, {
      params: new HttpParams().set('stObj', JSON.stringify(objResp))
    });
  }

  selectPersonal(objPer: any): Observable<any> {
    return this.httpClient.get<any>(`${ environment.apiUrl }api/AreaServicioController/SelectPersonal`, {
      params: new HttpParams().set('stObj', JSON.stringify(objPer))
    });
  }

  selectUsuario(objUserType: any): Observable<any> {
    return this.httpClient.get<any>(`${ environment.apiUrl }api/UsuarioController/SelectUsuario`, {
      params: new HttpParams().set('stObj', JSON.stringify(objUserType))
    });
  }

}
