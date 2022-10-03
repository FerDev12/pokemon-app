import { useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { localFavorites } from '../../utils';
import { MainLayout } from '../../components/layouts';

interface Props {
  pokemon: Pokemon;
}
const Pokemon: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  // useEffect(() => {
  //   setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
  // }, [pokemon.id]);

  const upperTitle =
    pokemon.name.split('')[0].toUpperCase() + pokemon.name.slice(1);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
  };

  return (
    <MainLayout title={upperTitle}>
      <Grid>
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
                  {isInFavorites
                    ? 'Remover de favoritos'
                    : 'Agregar a favoritos'}
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
      </Grid>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let pokemons151: string[] = [];

  for (let i = 0; i < 151; i++) {
    pokemons151.push(`${i + 1}`);
  }

  const paths = pokemons151.map((i) => {
    return {
      params: {
        id: i,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default Pokemon;
