import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Paginated, Results } from '../../dataTypes/paginatedResponse';
import { Observable, forkJoin, map, shareReplay, switchMap, tap } from 'rxjs';
import { Pokemon } from '../../dataTypes/pokemonResponse';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  data$: Observable<Paginated> | undefined
  tableRowsData$: Observable<Pokemon[]> | undefined;
  isLoading = true;

  constructor(private http: DataService) { }

  ngOnInit(): void {
    this.getData('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    console.log('onInit')
  }

  getData(url: string | null) {
    if (url) {
      this.isLoading = true;
      // Outer request, return an Observable that stores
      this.data$ = this.http.fetch<Paginated>(url)
      // sharePlay for making only one request even if the subscribers are multiple. --multicast
      .pipe(shareReplay(1));

      // Observable that stores pokemon data
      this.tableRowsData$ = this.data$.pipe(
        switchMap((response: Paginated) => {
          const requests = response.results.map((result) => this.http.fetch<Pokemon>(result.url));
          return forkJoin(requests);
        }),
        tap(() => this.isLoading = false)
      );
    }
  }

  extractTypeNames(types: any[]): string {
    return types.map((obj) => obj.type.name).join(', ');
  }
}
