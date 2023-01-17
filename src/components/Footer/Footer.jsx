import './footer.css';
import { AiFillGithub } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer>
      <div className="container footer">
        <div className="footer_text">
          <p>© 2023 | Designed and coded by Marco Lovato </p>
          <p>
            Made possible thanks to the{' '}
            <a href="https://imdb-api.com/" target="/blank">
              IMDb API
            </a>
          </p>
          <p>WARNING : the site is not responsive.</p>
        </div>

        <div className="footer_icons">
          <a href="https://github.com/Novecento201" target="/blank">
            <AiFillGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/marco-lovato-3816a3229/"
            target="/blank"
          >
            <AiFillLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
