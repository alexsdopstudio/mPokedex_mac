import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginated, Results } from '../../dataTypes/paginatedResponse';
import { Router } from '@angular/router';
import { Pokemon } from '../../dataTypes/pokemonResponse';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private api = `https://pokeapi.co/api/v2/`;
  @Output() urlSent = new EventEmitter<string>();
  data$: Observable<Pokemon> | undefined;
  typesData$: Observable<Paginated> | undefined;
  habitatsData$: Observable<Paginated> | undefined;
  types: Results[] | undefined;
  
  constructor(private service: DataService, private route: Router) { }

  ngOnInit(): void {
    this.typesData$ = this.service.fetch<Paginated>(this.api + 'type');
    this.typesData$.subscribe(res => this.types = res.results);
  }

  search(name: string): void {
    if (name) {
      this.data$ = this.service.fetch<Pokemon>(this.api + 'pokemon/' + name);
      this.data$.subscribe(res => {
        //navigate to the path using id
        this.route.navigate(['/card', res.id]);
      })
    }
  }

  sendUrl(url: string) {
    //console.log('child sidebar sent the url to the parent', url);
    this.urlSent.emit(url);
  }
}
