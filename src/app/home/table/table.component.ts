import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../../data.service';
import { Paginated, Results } from '../../dataTypes/paginatedResponse';
import { Observable, forkJoin, map, shareReplay, switchMap, tap } from 'rxjs';
import { Pokemon, PokemonType } from '../../dataTypes/pokemonResponse';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent{
/*   data$: Observable<Paginated> | undefined
  tableRowsData$: Observable<Pokemon[]> | undefined;
  tableData: Pokemon[] | undefined; */
  @Input() data: Pokemon[] | undefined;
  @Input() isLoading: Boolean | undefined;
  //isLoading = true;

  constructor(private service: DataService) { }

  /*

  ngOnInit(): void {
    this.getData('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    console.log(this.data)
  }

   getData(url: string | null): void {
    if (url) {
      this.isLoading = true;
      this.data$ = this.service.fetch<Paginated>(url)// Outer request, return an Observable that stores paginated data
        .pipe(shareReplay(1));// sharePlay for making only one request even if the subscribers are multiple. --multicast

      this.tableRowsData$ = this.data$.pipe(// Observable that stores pokemon data
        switchMap((response: Paginated) => {
          const requests = response.results.map((result) => this.service.fetch<Pokemon>(result.url));
          return forkJoin(requests);
        }),
        tap(() => this.isLoading = false)
      );
      this.tableRowsData$.subscribe(res => this.tableData = res);
    }
  } */

  // if service is private
  getTypeNames(types: PokemonType[]): string {
    return this.service.extractTypeNames(types);
  }
}
