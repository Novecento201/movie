import { useState, useEffect, useContext } from 'react';
import { FavoritesContext } from '../../Context/FavoriteContext';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import './detailpage.css';

const DetailPage = ({ setIsLoading }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const isInFavorites = favorites.some((item) => item.id === id);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://imdb-api.com/en/API/Title/${
        import.meta.env.VITE_API_KEY
      }/${id}/FullActor,FullCast,Trailer,Ratings`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  // da aggiungere ID DOPO sopra

  const {
    title,
    image,
    fullCast,
    awards,
    boxOffice,
    imDbRating,
    imDbRatingVotes,
    plot,
    releaseDate,
    runtimeStr,
    trailer,
    type,
    writers,
    genreList,
    year,
  } = data;

  return (
    <div className="container detail_container">
      <h2 className="detail_title">{title}</h2>
      <div className="detail_info">
        <div className="detail_img">
          <img src={image} alt={`Image of ${title}`} className="detail_image" />
        </div>
        <div className="detail_minorInfo">
          <p className="detail_plot">{plot}</p>
          <p className="detail_writers">Writers : {writers}</p>
          <p className="detail_genres">
            Genres :
            {genreList?.map((g) => (
              <i key={g.key}>{g.value} </i>
            ))}
          </p>

          <p className="detail_budget">
            Budget : {boxOffice?.budget}
            <br />
            Cumulative : {boxOffice?.cumulativeWorldwideGross}
          </p>

          <p className="detail_trailer">
            <a href={trailer?.linkEmbed}>IMDb Trailer</a>
          </p>

          <div>
            {/* Favorite btn */}
            {isInFavorites ? (
              <button
                onClick={() => {
                  removeFromFavorites(data);
                }}
              >
                <AiFillHeart className="detail_heart full_heart" />
              </button>
            ) : (
              <button
                onClick={() => {
                  addToFavorites(data);
                }}
              >
                <AiOutlineHeart className="detail_heart" />
              </button>
            )}
          </div>

          <div className="detail_superMinorInfo">
            <span>{year} </span>
            <span>• ({type}) •</span>
            <span> {runtimeStr}</span>
          </div>
        </div>
      </div>

      <hr className="detail_hr" />

      <div className="detail_actors_container">
        <h2 className="detail_actor_title">Actors </h2>

        <div className="container_actors">
          {fullCast?.actors.map((actor) => (
            <div key={actor.id} className="detail_actor">
              <img className="detail_actor_image" src={actor.image} />
              <p className="detail_actor_name">
                {actor.name} as {actor.asCharacter}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
