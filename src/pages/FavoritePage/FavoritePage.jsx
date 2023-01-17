import React, { useState } from 'react';
import { useContext } from 'react';
import { FavoritesContext } from '../../Context/FavoriteContext';
import { Pagination } from '../../components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import './favoritepage.css';

const FavoritePage = () => {
  const { favorites, addToFavorites, removeFromFavorites, setFavorites } =
    useContext(FavoritesContext);

  const navigate = useNavigate();

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = favorites.slice(firstPostIndex, lastPostIndex);

  console.log(favorites);

  const sortFavorites = (orderBy) => {
    const newFavoritesOrder = favorites.slice();
    switch (orderBy) {
      case 'higher_rank':
        newFavoritesOrder.sort((a, b) => a.rank - b.rank);
        break;
      case 'minor_rank':
        newFavoritesOrder.sort((a, b) => b.rank - a.rank);
        break;
      case 'title_AZ':
        newFavoritesOrder.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
      case 'title_ZA':
        newFavoritesOrder.sort((a, b) => (b.title > a.title ? 1 : -1));
        break;
      case 'year_recent':
        newFavoritesOrder.sort((a, b) => b.year - a.year);
        break;
      case 'year_old':
        newFavoritesOrder.sort((a, b) => a.year - b.year);
        break;
      case 'imdb_rating_best':
        newFavoritesOrder.sort((a, b) => b.imDbRating - a.imDbRating);
        break;
      case 'imdb_rating_worse':
        newFavoritesOrder.sort((a, b) => a.imDbRating - b.imDbRating);
        break;
      case 'imdb_rating_count_more':
        newFavoritesOrder.sort((a, b) => b.imDbRatingCount - a.imDbRatingCount);
        break;
      case 'imdb_rating_count_less':
        newFavoritesOrder.sort((a, b) => a.imDbRatingCount - b.imDbRatingCount);
        break;
    }
    setFavorites([...newFavoritesOrder]);
  };

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }

  const newFavorites =
    favorites.length > 0
      ? currentPosts.map((item) => (
          <div className="favorite_card">
            <img
              src={item.image}
              alt={`Image of ${item.title}`}
              className="img_favorites"
            />

            <h3 className="card_rank">{item.rank}</h3>

            <div className="card_text_container">
              {/* Title */}
              <h5 className="card_title">{item.title}</h5>

              <div>
                <div>
                  {/* Favorite btn */}

                  <button
                    onClick={() => {
                      removeFromFavorites(item);
                    }}
                  >
                    <AiFillHeart className="full_heart" />
                  </button>

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
                  <span className="card_rating_count"></span>(
                  {item.imDbRatingCount})
                </p>
              </div>
            </div>
          </div>
        ))
      : 'No favorites items';

  return (
    <div className="container favorites_container">
      <div className="favorites_top">
        <h2 className="favorites_title">Your Favorites - </h2>
        <select
          onChange={(e) => sortFavorites(e.target.value)}
          className="favorites_select"
        >
          <option value="">Select order</option>
          <option value="higher_rank">Higher Rank</option>
          <option value="minor_rank">Minor Rank</option>
          <option value="title_AZ">Title A-Z</option>
          <option value="title_ZA">Title Z-A</option>
          <option value="year_recent">Year Recent</option>
          <option value="year_old">Year Old</option>
          <option value="imdb_rating_best">ImDb Rating Best</option>
          <option value="imdb_rating_worse">ImDb Rating Worse</option>
          <option value="imdb_rating_count_more">ImDb Rating Count More</option>
          <option value="imdb_rating_count_less">ImDb Rating Count Less</option>
        </select>
      </div>

      <div className="favorites_container_results">{newFavorites}</div>

      <Pagination
        totalPosts={favorites.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default FavoritePage;
