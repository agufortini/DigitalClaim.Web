import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

// ENTIDADES
import { Rating } from '../_entities/rating.entities';

@Injectable({
    providedIn: 'root'
})
export class RatingService {

    constructor(private httpClient: HttpClient) {}

    registrarRating(objRating: Rating): Observable<Rating> {
        return this.httpClient.get<Rating>(`${environment.apiUrl}api/ReclamoController/RegistrarRating`, {
            params: new HttpParams().set('stObj', JSON.stringify(objRating))
        });
    }
}
