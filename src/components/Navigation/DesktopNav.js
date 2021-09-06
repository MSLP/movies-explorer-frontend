export default function DesktopNav() {
  return (
    <nav className="navigation__desktop">
      <ul className="navigation__list">
        <li className="navigation__item"><a className="navigation__link" href="/">Main</a></li>
        <li className="navigation__item"><a className="navigation__link" href="/movies">Movies</a></li>
        <li className="navigation__item"><a className="navigation__link" href="/saved-movies">Saved movies</a></li>
      </ul>
    </nav>
  );
}
