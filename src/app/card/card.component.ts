import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subscription, catchError, of, shareReplay, tap } from 'rxjs';
import { Pokemon, PokemonType } from '../dataTypes/pokemonResponse';
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

  constructor(public service: DataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.isLoading = true;
      this.currentId = +params['id'];
      this.cardData$ = this.service.fetch<Pokemon>(this.url + params['id'])
        .pipe(
          tap(() => this.isLoading = false),
        );
    });
  }

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


  /*  
    // if service is private
    getTypeNames(types: PokemonType[]): string {
    return this.service.extractTypeNames(types);
  } */
}
