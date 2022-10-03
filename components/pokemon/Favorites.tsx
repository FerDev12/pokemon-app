import { Grid } from '@nextui-org/react';
import { FC } from 'react';
import { FavoriteCardPokemon } from './FavoriteCardPokemon';

interface Props {
  favorites: number[];
}

const Favorites: FC<Props> = ({ favorites }) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {favorites.map((id) => (
        <FavoriteCardPokemon id={id} key={id} />
      ))}
    </Grid.Container>
  );
};

export { Favorites };
