import { Grid, Card } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  id: number;
}

const FavoriteCardPokemon: FC<Props> = ({ id }) => {
  const router = useRouter();

  const onFavoriteClick = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card
        isHoverable
        isPressable
        css={{ paddeing: 10 }}
        onPress={onFavoriteClick}
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width={'100%'}
          height={140}
        />
      </Card>
    </Grid>
  );
};

export { FavoriteCardPokemon };
