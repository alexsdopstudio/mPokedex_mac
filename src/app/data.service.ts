import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PokemonType } from './dataTypes/pokemonResponse';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private router: Router) { }
  private readonly api = 'https://pokeapi.co/api/v2/';

  fetch<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError(() => {
        this.router.navigate(['404']);
        return EMPTY;
      })
    );
  }
}
