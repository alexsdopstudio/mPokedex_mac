import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private readonly api = 'https://pokeapi.co/api/v2/';

  fetch<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

/*   getData<T>(ep: string, key = ''): Observable<T> {
    return this.http.get<T>(`${this.api}${ep}/${key}`);
  } */

}
