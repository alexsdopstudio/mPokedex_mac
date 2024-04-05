import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, forkJoin, shareReplay, switchMap, tap } from 'rxjs';
import { Paginated, Results } from '../dataTypes/paginatedResponse';
import { Pokemon } from '../dataTypes/pokemonResponse';
import { TypeResponse } from '../dataTypes/typeResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  tableResponse$: Observable<Paginated> | undefined;
  tableRowsData$: Observable<Pokemon[]> | undefined;
  filteredResponse$: Observable<TypeResponse> | undefined;
  filteredData$: Observable<Pokemon[]> | undefined;

  data: Pokemon[] | undefined;
  isLoading = true;

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.getPaginatedData('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
  }



  getPaginatedData(url: string | null): void {
    if (url) {
      this.isLoading = true;
      this.tableResponse$ = this.service.fetch<Paginated>(url)// Outer request, return an Observable that stores paginated data
        .pipe(shareReplay(1));// sharePlay for making only one request even if the subscribers are multiple. --multicast

      this.tableRowsData$ = this.tableResponse$.pipe(// Observable that stores pokemon data
        switchMap((response: Paginated) => {
          const requests = response.results.map((result) => this.service.fetch<Pokemon>(result.url));
          return forkJoin(requests);
        }),
        tap(() => this.isLoading = false)
      );
      this.tableRowsData$.subscribe(res => this.data = res);
    }
  }


  getFilteredData(url: string) {
    if (url) {
      this.filteredResponse$ = this.service.fetch<TypeResponse>(url);
      console.log('parent fetched data from', url);
      //this.filteredResponse$.subscribe(res => this.data = res);
      //this.filteredResponse$.subscribe(res => console.log(res.pokemon));

      this.filteredData$ = this.filteredResponse$.pipe(
        switchMap((response: TypeResponse) => {
          console.log(response);
          const requests = response.pokemon.map((result) => this.service.fetch<Pokemon>(result.url));
          console.log(requests)
          return forkJoin(requests);
        }),
        tap(() => this.isLoading = false)
      );

      this.filteredData$.subscribe(res => console.log(res));
      this.filteredData$.subscribe(res => this.data = res);
    }
  }
}
