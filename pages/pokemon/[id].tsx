import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { PokeProps } from '../../interfaces';
import { getPokemonInfo, getPokeProps } from '../../utils';
import { MainLayout } from '../../components/layouts';
import { PokemonDetail } from '../../components/pokemon';

interface Props {
  pokemon: PokeProps;
}
const Pokemon: NextPage<Props> = ({ pokemon }) => {
  const upperTitle =
    pokemon.name.split('')[0].toUpperCase() + pokemon.name.slice(1);

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
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    // If no pokemon with the requested id is found,
    // then the user will be redirected to the main page
    // or any specified url
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const pokeProps = await getPokeProps(pokemon);

  return {
    props: { pokemon: pokeProps },
    // Incremental Static Regeneration
    revalidate: 60, // seconds
  };
};

export default Pokemon;
