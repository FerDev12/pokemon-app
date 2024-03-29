const getFavorites = (): number[] =>
  JSON.parse(localStorage.getItem('favorites') ?? '[]');

const toggleFavorite = (id: number) => {
  console.log('toggleFavorite');

  let favorites: number[] = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  let favorites: number[] = getFavorites();

  return favorites.includes(id);
};

const localFavorites = {
  getFavorites,
  toggleFavorite,
  existInFavorites,
};

export { localFavorites };
