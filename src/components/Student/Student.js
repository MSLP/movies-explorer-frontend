import './Student.css';
import student from '../../images/student.jpeg';
import Title from '../Title/Title';
import arrow from '../../images/arrow.svg';

export default function Student() {
  return (
    <div className="student">
      <Title>Student</Title>
      <div className="student__container">
        <div>
          <h3 className="student__name">Mariia</h3>
          <p className="student__description">Frontend developer, 25 yo</p>
          <p className="student__text">
            I was born in Saratov, Russia. I have a bachelor degree in Computer Science.
            I really like travelling. I have been living in Bay Area in California, USA,
            but now I live in London, UK. In my free time I work out and read books.
          </p>
          <a className="student__social" href="https://www.instagram.com/mariia_slp/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a className="student__social" href="https://github.com/MSLP" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <img src={student} alt="student" className="student__photo" />
      </div>
      <h4 className="student__portfolio">Portfolio</h4>
      <ul className="student__list">
        <li className="student__item">
          <a className="student__link" href="https://github.com/MSLP/how-to-learn" target="_blank" rel="noopener noreferrer">
            Static web-page
            <img src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="student__item">
          <a className="student__link" href="https://github.com/MSLP/russian-travel" target="_blank" rel="noopener noreferrer">
            Adaptive web-page
            <img src={arrow} alt="arrow" />
          </a>
        </li>
        <li className="student__item">
          <a className="student__link" href="https://github.com/MSLP/react-mesto-api-full" target="_blank" rel="noopener noreferrer">
            Single-page application
            <img src={arrow} alt="arrow" />
          </a>
        </li>
      </ul>
    </div>
  );
}
