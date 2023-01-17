import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHome } from 'react-icons/ai';
import { BsFillSunFill } from 'react-icons/bs';
import { BsMoonFill } from 'react-icons/bs';
import Ripples from 'react-ripples';

import './header.css';
import { useContext, useState } from 'react';
import { FavoritesContext } from '../../Context/FavoriteContext';
import { useEffect } from 'react';

const Header = () => {
  const { favorites } = useContext(FavoritesContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  function changeTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    localStorage.setItem('selected-theme', theme);
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <header>
      <div className="container">
        <div className="header">
          <h2>
            <Link to="/" className="header_logo">
              MOVIES
            </Link>
          </h2>

          <nav className="navbar">
            <Search />

            <Link to="/">
              <AiFillHome className="header_icon" />
            </Link>

            <Link to="/favorite">
              {favorites.length === 0 ? (
                <AiOutlineHeart className="header_icon" />
              ) : (
                <AiFillHeart className="header_icon" />
              )}
              <span className="header_favorite_number">{favorites.length}</span>
            </Link>

            <Ripples>
              <button onClick={changeTheme}>
                {theme === 'light' ? (
                  <BsFillSunFill className="header_icon" />
                ) : (
                  <BsMoonFill className="header_icon" />
                )}
              </button>
            </Ripples>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
