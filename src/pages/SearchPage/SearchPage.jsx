import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components';
import { useContext } from 'react';
import { InputContext } from '../../Context/InputContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineInformationCircle } from 'react-icons/hi';

import './searchpage.css';
import { FavoritesContext } from '../../Context/FavoriteContext';

const SearchPage = ({ setIsLoading }) => {
  const navigate = useNavigate();

  const { inputText, genres } = useContext(InputContext);
  const { favorites, removeFromFavorites, addToFavorites } =
    useContext(FavoritesContext);
  const finalText = `title=${inputText}`;
  const finalGenres = `genres=${genres.join(',')}`;

  // console.log('SearchPage', finalText, finalGenres);

  const [result, setResult] = useState([]);
  const [text, setText] = useState({
    title: '',
    genres: '',
    error: ``,
  });

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = result.slice(firstPostIndex, lastPostIndex);

  const sortResults = (orderBy) => {
    const newResults = result.slice();
    switch (orderBy) {
      case 'title_AZ':
        newResults.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
      case 'title_ZA':
        newResults.sort((a, b) => (b.title > a.title ? 1 : -1));
        break;

      case 'imdb_rating_best':
        newResults.sort((a, b) => b.imDbRating - a.imDbRating);
        break;
      case 'imdb_rating_worse':
        newResults.sort((a, b) => a.imDbRating - b.imDbRating);
        break;
    }
    setResult([...newResults]);
  };

  useEffect(() => {
    setIsLoading(true);
    setText({
      title: '',
      genres: '',
      error: ``,
    });
    setResult([]);

    let url = `https://imdb-api.com/API/AdvancedSearch/${
      import.meta.env.VITE_API_KEY
    }?`;

    if (inputText && finalGenres.length > 0) {
      url += `${finalText}&${finalGenres}`;
    } else if (inputText) {
      url += finalText;
    } else {
      url += finalGenres;
    }

    // console.log('url', url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => setResult(data.results))
      .finally(() => {
        setIsLoading(false);
        setText({
          title: `Result for : ${inputText}`,
          genres: `Genres active : ${genres}`,
          error: `No results for : ${inputText}`,
        });
      });
  }, [finalText, genres]);

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }

  console.log(currentPosts);
  const results = currentPosts.map((item) => {
    const isInFavorites = favorites.some((f) => f.id === item.id);
    return (
      <div className="searchPage_card">
        <img
          src={item.image}
          alt={`Image of ${item.title}`}
          className="img_searchPage"
        />

        <div className="card_text_container">
          {/* Title */}
          <h5 className="card_title">{item.title}</h5>

          <div>
            <div>
              {/* Favorite btn */}
              {isInFavorites ? (
                <button
                  onClick={() => {
                    removeFromFavorites(item);
                  }}
                >
                  <AiFillHeart className="full_heart" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToFavorites(item);
                  }}
                >
                  <AiOutlineHeart />
                </button>
              )}

              {/* Info btn */}
              <button
                onClick={() => {
                  handleClick(item.id);
                }}
              >
                <HiOutlineInformationCircle />
              </button>
            </div>

            {/* Ratings */}
            <p className="card_rating">
              {item.imDbRating}
              <span className="card_rating_count"></span>({item.imDbRatingVotes}
              )
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container searchPage_container">
      {text.title.length > 0 && (
        <div>
          <div className="searchPage_top">
            <h2 lassName="searchPage_title">{text.title} - </h2>
            <select
              onChange={(e) => sortResults(e.target.value)}
              className="searchPage_select"
            >
              <option value="">Select order</option>
              <option value="title_AZ">Title A-Z</option>
              <option value="title_ZA">Title Z-A</option>
              <option value="imdb_rating_best">ImDb Rating Best</option>
              <option value="imdb_rating_worse">ImDb Rating Worse</option>
            </select>
          </div>
          {genres.length > 0 && (
            <p className="searchPage_genres">{text.genres}</p>
          )}
        </div>
      )}

      <h2>{text.error.length > 0 && result.length == 0 && text.error}</h2>

      {result.length > 0 && (
        <div className="searchPage_container_results">{results}</div>
      )}

      <Pagination
        totalPosts={result.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default SearchPage;
