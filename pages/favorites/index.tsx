import { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { localFavorites } from '../../utils';
import { NoFavorites } from '../../components/ui';
import { MainLayout } from '../../components/layouts';
import { Favorites as FavoritePokemons } from '../../components/pokemon';

const Favorites: NextPage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(localFavorites.getFavorites());
  }, []);

  return (
    <MainLayout title='Favoritos'>
      {favorites.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons favorites={favorites} />
      )}
    </MainLayout>
  );
};

export default Favorites;
