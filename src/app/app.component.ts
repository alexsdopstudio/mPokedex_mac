import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon } from './dataTypes/pokemonResponse';
import { Paginated } from './dataTypes/paginatedResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
