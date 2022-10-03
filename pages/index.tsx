import { Card, Grid, Row, Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { pokeApi } from '../api';
import { MainLayout } from '../components/layouts';
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  const pokemonCards = pokemons.map((pokemon) => (
    <PokemonCard pokemon={pokemon} key={pokemon.id} />
  ));

  return (
    <>
      <MainLayout title='Listado de Pókemons'>
        <Grid.Container gap={2} justify='flex-start'>
          {pokemonCards}
        </Grid.Container>
      </MainLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // fetch pokemons data, define response type
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => {
    const id = i + 1;

    return {
      ...pokemon,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    };
  });

  // return props
  return {
    props: {
      pokemons,
    },
  };
};
export default Home;
