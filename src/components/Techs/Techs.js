import './Techs.css';
import Title from '../Title/Title';

export default function Techs() {
  return (
    <div className="techs">
      <div className="techs__container">
        <Title>Technologies</Title>
        <h3 className="techs__title">7 technologies</h3>
        <p className="techs__text">
          During this frontend engineering course we learned
          the following technologies applied in the final project.
        </p>
        <ul className="techs__list">
          <li className="techs__item"><p className="techs__item_text">HTML</p></li>
          <li className="techs__item"><p className="techs__item_text">CSS</p></li>
          <li className="techs__item"><p className="techs__item_text">JS</p></li>
          <li className="techs__item"><p className="techs__item_text">React</p></li>
          <li className="techs__item"><p className="techs__item_text">Git</p></li>
          <li className="techs__item"><p className="techs__item_text">Express.js</p></li>
          <li className="techs__item"><p className="techs__item_text">mongoDB</p></li>
        </ul>
      </div>
    </div>
  );
}
