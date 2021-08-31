import './AboutProject.css';
import Title from '../Title/Title';

export default function AboutProject() {
  return (
    <div className="about">
      <Title>About</Title>
      <div className="about__grid">
        <div>
          <h2 className="about__title">Final project included 5 milestones</h2>
          <p className="about__text">
            Planning, backend development, UI layout, features implementation, and last touches.
          </p>
        </div>
        <div>
          <h2 className="about__title">Final project took 5 weeks</h2>
          <p className="about__text">
            Each milestone had soft and hard deadlines,
            which had to be met for successful sign off.
          </p>
        </div>
      </div>
      <div className="about__timeline">
        <div>
          <p className="about__timeline_1">1 week</p>
          <p className="about__timeline_name">Back-end</p>
        </div>
        <div>
          <p className="about__timeline_4">4 weeks</p>
          <p className="about__timeline_name">Front-end</p>
        </div>
      </div>
    </div>
  );
}
