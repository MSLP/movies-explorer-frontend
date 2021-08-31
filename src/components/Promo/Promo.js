import './Promo.css';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';

export default function Promo() {
  return (
    <>
      <div className="promo">
        <Header isMain />
        <div className="promo__container">
          <h1 className="promo__title">Final project by student of Frontend engineering faculty.</h1>
        </div>
      </div>
      <NavTab />
    </>
  );
}
