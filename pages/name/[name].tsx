import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { pokeApi } from '../../api';
import { MainLayout } from '../../components/layouts';
import { PokemonDetail } from '../../components/pokemon';
import { PokemonListResponse, PokeProps } from '../../interfaces';
import { getPokeProps, getPokemonInfo } from '../../utils';
interface Props {
  pokemon: PokeProps;
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
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { name } = ctx.params as { name: string };

  const pokemon = await getPokemonInfo(name);

  if (!pokemon)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const pokeProps = await getPokeProps(pokemon);

  return {
    props: { pokemon: pokeProps },
    revalidate: 60, // 60 seconds
  };
};

export default PokemonByName;
