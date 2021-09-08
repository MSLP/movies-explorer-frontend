import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <h4 className="footer__title">Training project Y.Practicum x BeatFilm.</h4>
      <div className="footer__links">
        <p className="footer__copyright">&copy;2021</p>
        <ul className="footer__list">
          <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.com/" target="_blank" rel="noopener noreferrer">Y.Practicum</a></li>
          <li className="footer__item"><a className="footer__link" href="https://github.com/MSLP" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li className="footer__item"><a className="footer__link" href="https://www.linkedin.com/in/mslp/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  );
}
