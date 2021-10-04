import PropTypes from 'prop-types';
import './Promo.css';
import Header from '../Header/Header';

export default function Promo({ loggedIn }) {
  return (
    <div className="promo">
      <Header isMain loggedIn={loggedIn} />
      <div className="promo__container">
        <h1 className="promo__title">Final project by student of Frontend engineering faculty.</h1>
      </div>
    </div>
  );
}

Promo.propTypes = {
  loggedIn: PropTypes.bool,
};

Promo.defaultProps = {
  loggedIn: false,
};
