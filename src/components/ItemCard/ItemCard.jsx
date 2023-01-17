import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../../Context/FavoriteContext';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineInformationCircle } from 'react-icons/hi';

import './itemcard.css';

const ItemCard = ({ item }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const {
    crew,
    fullTitle,
    id,
    imDbRating,
    imDbRatingCount,
    image,
    rank,
    title,
    year,
    // rankUpDown (for series only)
  } = item;

  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }

  const isInFavorites = favorites.some((item) => item.id === id);

  return (
    <div className="card">
      <img src={image} alt={`Image of ${title}`} className="card_image" />

      <h3 className="card_rank">{rank}</h3>

      <div className="card_text_container">
        {/* Title */}
        <h5 className="card_title">{title}</h5>

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
                handleClick(id);
              }}
            >
              <HiOutlineInformationCircle />
            </button>
          </div>

          {/* Ratings */}
          <p className="card_rating">
            {imDbRating}
            <span className="card_rating_count"></span>({imDbRatingCount})
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
