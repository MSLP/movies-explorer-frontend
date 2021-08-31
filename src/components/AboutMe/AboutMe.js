import './AboutMe.css';
import student from '../../images/student.jpeg';
import Title from '../Title/Title';
import Portfolio from '../Portfolio/Portfolio';

export default function AboutMe() {
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
      <Portfolio />
    </div>
  );
}
