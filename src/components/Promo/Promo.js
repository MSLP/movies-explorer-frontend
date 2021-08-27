import './Promo.css';
import Button from '../Button/Button';

export default function Promo() {
  return (
    <>
      <header />
      <div className="promo">
        <div className="promo__container">
          <h1 className="promo__title">Final project by studen of Frontend engineering faculty.</h1>
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
