import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { Paginated, Results } from '../../dataTypes/Paginated';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  constructor(private http: DataService){}

  //data storage: Type
  paginatedData: Paginated | undefined;
  results: Results[] | undefined
  

  getPaginated(): void {
    this.http.fetch<Paginated>('url').subscribe((response) => {
      this.paginatedData = response;
    });
  }

  getResults(): void {
    this.http.fetch<Paginated>('url').subscribe((response) => {
      this.results = response.results;
    });
  }


  //data storage: Observable<Type> 
  paginated$: Observable<Paginated> | undefined
  results$: Observable<Results[]> | undefined

  getPaginated2(){
    this.paginated$ = this.http.fetch('paginated url');
  }
  getResults2(){
    this.results$ = this.http.fetch('paginated url');
  }
  
}
