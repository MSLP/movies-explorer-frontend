import './Promo.css';
import Button from '../Button/Button';
import Header from '../Header/Header';

export default function Promo() {
  return (
    <>
      <div className="promo">
        <Header />
        <div className="promo__container">
          <h1 className="promo__title">Final project by student of Frontend engineering faculty.</h1>
        </div>
      </div>
      <div className="promo__nav">
        <div className="promo__nav_buttons">
          <Button className="button__promo">About</Button>
          <Button className="button__promo">Technologies</Button>
          <Button className="button__promo">Student</Button>
        </div>
      </div>
    </>
  );
}
