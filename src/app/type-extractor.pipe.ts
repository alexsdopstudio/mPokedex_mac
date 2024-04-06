import { Pipe, PipeTransform } from '@angular/core';
import { PokemonType } from './dataTypes/pokemonResponse';

@Pipe({
  name: 'typeExtractor'
})
export class TypeExtractorPipe implements PipeTransform {

  transform(types: PokemonType[]): string {
    return types.map((obj) => obj.type.name).join(', ');
  }
}
