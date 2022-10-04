import { Pokemon } from './pokemon-full';

export interface PokeProps extends Pokemon {
  abilitiesDescription: AbilityDescription[];
}

export interface AbilityDescription {
  name: string;
  description: string;
}
