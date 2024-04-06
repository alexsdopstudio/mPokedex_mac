import { Component, Input } from '@angular/core';
import { DataService } from '../../data.service';
import { Pokemon, PokemonType } from '../../dataTypes/pokemonResponse';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() data: Pokemon[] | undefined;
  @Input() isLoading: Boolean | undefined;

  constructor(private service: DataService) { }


  // TODO: encapsulate in a pipe
  getTypeNames(types: PokemonType[]): string {
    return this.service.extractTypeNames(types);
  }
}
