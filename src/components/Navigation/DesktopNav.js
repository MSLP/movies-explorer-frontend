import { NavLink } from 'react-router-dom';

export default function DesktopNav() {
  return (
    <nav className="navigation__desktop">
      <ul className="navigation__list">
        <li className="navigation__item"><NavLink activeClassName="navigation__link_active" className="navigation__link" exact to="/">Main</NavLink></li>
        <li className="navigation__item"><NavLink activeClassName="navigation__link_active" className="navigation__link" to="/movies">Movies</NavLink></li>
        <li className="navigation__item"><NavLink activeClassName="navigation__link_active" className="navigation__link" to="/saved-movies">Saved movies</NavLink></li>
      </ul>
    </nav>
  );
}
