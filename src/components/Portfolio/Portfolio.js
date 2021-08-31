import './Portfolio.css';
import arrow from '../../images/arrow.svg';

export default function Portfolio() {
  return (
    <>
      <h4 className="portfolio">Portfolio</h4>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/MSLP/how-to-learn" target="_blank" rel="noopener noreferrer">
            Static web-page
            <img src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/MSLP/russian-travel" target="_blank" rel="noopener noreferrer">
            Adaptive web-page
            <img src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://github.com/MSLP/react-mesto-api-full" target="_blank" rel="noopener noreferrer">
            Single-page application
            <img src={arrow} alt="arrow" />
          </a>
        </li>
      </ul>
    </>
  );
}
