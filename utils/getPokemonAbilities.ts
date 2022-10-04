import axios from 'axios';
import {
  AbilityDescription,
  PokeAbility,
  Pokemon,
  PokeProps,
} from '../interfaces';

export const getPokeProps = async (pokemon: Pokemon): Promise<PokeProps> => {
  let abilitiesDescription: AbilityDescription[] = [];

  for await (const poke of pokemon.abilities) {
    const name = poke.ability.name;
    const url = poke.ability.url;

    const { data } = await axios.get<PokeAbility>(url);

    if (data.effect_entries.length === 0) {
      continue;
    } else {
      const description = data.effect_entries
        .filter((entry) => entry.language.name === 'en')
        .flatMap((val) => val.effect)[0];

      abilitiesDescription.push({ name, description });
    }
  }

  return {
    ...pokemon,
    abilitiesDescription,
  };
};
