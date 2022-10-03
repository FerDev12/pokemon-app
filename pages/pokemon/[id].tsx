import { useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import { MainLayout } from '../../components/layouts';
import { PokemonDetail } from '../../components/pokemon';

interface Props {
  pokemon: Pokemon;
}
const Pokemon: NextPage<Props> = ({ pokemon }) => {
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
    <MainLayout title={upperTitle}>
      <PokemonDetail pokemon={pokemon} />
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

  const pokemon = await getPokemonInfo(id);

  return {
    props: {
      pokemon,
    },
  };
};

export default Pokemon;
