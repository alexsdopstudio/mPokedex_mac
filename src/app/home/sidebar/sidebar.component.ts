import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginated } from '../../dataTypes/paginatedResponse';
import { Router } from '@angular/router';
import { Pokemon } from '../../dataTypes/pokemonResponse';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private url = `https://pokeapi.co/api/v2/pokemon/`;
  data$: Observable<Pokemon> | undefined;

  constructor(private http: DataService, private route: Router){}


  search(name: string): void {
    if(name){
      this.data$ = this.http.fetch<Pokemon>(this.url + name);
      this.data$.subscribe(res =>{
        //go to the path using id
        this.route.navigate(['/card', res.id]);
      })      
    }
  }

}
