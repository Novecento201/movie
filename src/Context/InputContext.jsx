import { useState, createContext } from 'react';

export const InputContext = createContext({
  inputText: '',
  setInputText: () => {},
  genres: [],
  setGenres: () => {},
});

export const InputProvider = ({ children }) => {
  const [inputText, setInputText] = useState('');
  const [genres, setGenres] = useState([]);

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenresChange = (e) => {
    if (e.target.checked) {
      setGenres([...genres, e.target.value]);
    } else {
      setGenres(genres.filter((genre) => genre !== e.target.value));
    }
  };

  return (
    <InputContext.Provider
      value={{
        inputText,
        genres,
        setInputText,
        setGenres,
        handleGenresChange,
        handleInputTextChange,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
