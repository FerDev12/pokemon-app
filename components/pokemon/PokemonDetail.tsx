import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { FC, useState } from 'react';
import { Pokemon } from '../../interfaces';
import { localFavorites } from '../../utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const upperTitle =
    pokemon.name.split('')[0].toUpperCase() + pokemon.name.slice(1);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites((prevFav) => !prevFav);

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -135,
        origin: {
          x: 1, // 0 - 1
          y: 0, // 0 -1
        },
      });
    }
  };

  return (
    <Grid.Container css={{ marginTop: '5px' }} gap={2}>
      <Grid xs={12} sm={4}>
        <Card isPressable css={{ padding: '30px' }}>
          <Card.Body>
            <Card.Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                '/no-image.png'
              }
              alt={pokemon.name}
              width='100%'
              height={200}
            />
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Text h1>{pokemon.name}</Text>
            <Button
              onPress={onToggleFavorite}
              color='gradient'
              animated
              bordered={!isInFavorites}
            >
              {isInFavorites ? 'Remover de favoritos' : 'Agregar a favoritos'}
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <Container display='flex'>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.front_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <Image
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
                width={100}
                height={100}
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export { PokemonDetail };
