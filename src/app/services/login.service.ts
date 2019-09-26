import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  login(objSesion: string): Observable<string> {
    return this.httpClient.get<string>(`${ environment.apiUrl }api/LoginController/ValidarSesion`, {
      params: new HttpParams().set('stObj', JSON.stringify(objSesion))
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  emailRecupPass(stEmail: string) {
    return this.httpClient.post<any>(`${ environment.apiUrl }api/LoginController/RecuperarPassword`, { usu_email: stEmail });
  }

  /* LOGIN GUARD */
  estaAutenticado(): boolean {

    const storage = localStorage.getItem('currentUser');

    if (storage != null) {
      return true;
    } else {
      return false;
    }

  }

}
