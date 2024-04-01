import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subscription, catchError, of, shareReplay, tap } from 'rxjs';
import { Pokemon } from '../dataTypes/pokemonResponse';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  private url = `https://pokeapi.co/api/v2/pokemon/`;
  cardData$: Observable<Pokemon | null> | undefined
  currentId: number | undefined;
  isLoading = true;
  hasError = false;

  constructor(private http: DataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.isLoading = true;
      this.currentId = +params['id'];
      this.cardData$ = this.http.fetch<Pokemon>(this.url + params['id'])
        .pipe(
          //catchError(this.handleError),
          tap(() => this.isLoading = false),
          /* catchError((error) => {
            this.isLoading = false;
            this.hasError = true;
            console.error('Error fetching Pokémon details:', error);
            return of(null);
          }) */
        );
    });
  }


/* // handled in the service
    private handleError = () => {
    // Redirect to the 404 route
    this.router.navigate(['404']);
    return EMPTY;
  } */

  nextPokemon() {
    if (this.currentId) {
      this.router.navigate(['/card', this.currentId + 1]);
    }
  }

  prevPokemon() {
    if (this.currentId) {
      this.router.navigate(['/card', this.currentId - 1]);
    }
  }
}
