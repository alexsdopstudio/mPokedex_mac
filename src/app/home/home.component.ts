import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, forkJoin, shareReplay, switchMap, tap } from 'rxjs';
import { Paginated } from '../dataTypes/paginatedResponse';
import { Pokemon } from '../dataTypes/pokemonResponse';
import { TypeResponse } from '../dataTypes/typeResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tableResponse$: Observable<Paginated> | undefined;
  tableRowsData$: Observable<Pokemon[]> | undefined;
  filteredResponse$: Observable<TypeResponse> | undefined;
  filteredData$: Observable<Pokemon[]> | undefined;
  data: Pokemon[] | undefined;
  isLoading = true;
  paginatedData: Paginated | undefined;

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.getPaginatedData('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
  }

  private fetchPaginatedData<T>(url: string): Observable<T> {
    return this.service.fetch<T>(url).pipe(shareReplay(1));
  }

  private fetchPokemonData(results: { url: string }[]): Observable<Pokemon[]> {
    return forkJoin(results.map(result => this.service.fetch<Pokemon>(result.url))).pipe(
      tap(() => this.isLoading = false)
    );
  }

  getPaginatedData(url: string | null): void {
    if (!url) {
      return;
    }
    this.isLoading = true;
    this.tableResponse$ = this.fetchPaginatedData<Paginated>(url);
    this.tableResponse$.subscribe(res => this.paginatedData = res);

    this.tableRowsData$ = this.tableResponse$.pipe(
      switchMap(response => this.fetchPokemonData(response.results)),
    );
    this.tableRowsData$.subscribe(res => this.data = res);
  }

  getFilteredData(url: string): void {
    if (!url) {
      return;
    }
    this.isLoading = true;
    this.filteredResponse$ = this.fetchPaginatedData<TypeResponse>(url);

    this.filteredData$ = this.filteredResponse$.pipe(
      switchMap(response => this.fetchPokemonData(response.pokemon.map(p => p.pokemon))),
    );
    this.filteredData$.subscribe(res => this.data = res);
  }
}
