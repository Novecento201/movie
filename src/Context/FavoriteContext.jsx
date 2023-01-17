import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  setFavorites: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item) => {
    const existingFavorite = favorites.find(
      (favorite) => favorite.id === item.id
    );
    if (!existingFavorite) {
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (item) => {
    const newFavorites = favorites.filter((show) => show.id !== item.id);
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        setFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
