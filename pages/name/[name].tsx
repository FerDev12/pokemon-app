import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { pokeApi } from '../../api';
import { MainLayout } from '../../components/layouts';
import { PokemonDetail } from '../../components/pokemon';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo } from '../../utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonByName: NextPage<Props> = ({ pokemon }) => {
  return (
    <MainLayout title={pokemon.name}>
      <PokemonDetail pokemon={pokemon} />
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const paths = data.results.map((pokemon) => {
    return {
      params: { name: pokemon.name },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { name } = ctx.params as { name: string };

  const pokemon = await getPokemonInfo(name);

  return {
    props: { pokemon },
  };
};

export default PokemonByName;
