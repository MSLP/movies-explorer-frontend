import './Tech.css';
import Title from '../Title/Title';

export default function Tech() {
  return (
    <div className="tech">
      <div className="tech__container">
        <Title>Technologies</Title>
        <h3 className="tech__title">7 technologies</h3>
        <p className="tech__text">
          During this frontend engineering course we learned
          the following technologies applied in the final project.
        </p>
        <ul className="tech__list">
          <li className="tech__item"><p className="tech__item_text">HTML</p></li>
          <li className="tech__item"><p className="tech__item_text">CSS</p></li>
          <li className="tech__item"><p className="tech__item_text">JS</p></li>
          <li className="tech__item"><p className="tech__item_text">React</p></li>
          <li className="tech__item"><p className="tech__item_text">Git</p></li>
          <li className="tech__item"><p className="tech__item_text">Express.js</p></li>
          <li className="tech__item"><p className="tech__item_text">mongoDB</p></li>
        </ul>
      </div>
    </div>
  );
}
