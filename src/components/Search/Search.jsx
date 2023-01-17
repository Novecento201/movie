import { useContext, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { InputContext } from '../../Context/InputContext';

import './search.css';

const Search = () => {
  const { inputText, genres, handleGenresChange, handleInputTextChange } =
    useContext(InputContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const genreOptions = [
    'action',
    'adventure',
    'animation',
    'biography',
    'comedy',
    'crime',
    'documentary',
    'drama',
    'family',
    'fantasy',
    'film_noir',
    'game_show',
    'history',
    'horror',
    'music',
    'musical',
    'mystery',
    'news',
    'reality_tv',
    'romance',
    'sci_fi',
    'sport',
    'talk_show',
    'thriller',
    'war',
    'western',
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('search');
  }

  // console.log('Search ', inputText, genres);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="search" className="search_container">
        <BsSearch className="search_icon" onClick={(e) => handleSubmit(e)} />
        <input
          className="search_input"
          name="search"
          type="text"
          value={inputText}
          required
          onChange={(e) => {
            handleInputTextChange(e);
          }}
        />
      </label>

      {/* <div>
        <button onClick={toggleDropdown} type="button">
          Filter by genres
        </button>
        {showDropdown && (
          <div>
            {genreOptions.map((genre, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={genre}
                  onChange={handleGenresChange}
                  checked={genres.includes(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        )}
      </div> */}
    </form>
  );
};

export default Search;
