import { useRef } from 'react';
import PropTypes from 'prop-types';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

export default function Main({ loggedIn }) {
  const projectRef = useRef();
  function handleProjectScroll() {
    projectRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  const techRef = useRef();
  function handleTechScroll() {
    techRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  const studentRef = useRef();
  function handleStudentScroll() {
    studentRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <>
      <Promo loggedIn={loggedIn} />
      <NavTab
        projectClick={handleProjectScroll}
        techClick={handleTechScroll}
        studentClick={handleStudentScroll}
      />
      <AboutProject ref={projectRef} />
      <Techs ref={techRef} />
      <AboutMe ref={studentRef} />
      <Footer />
    </>
  );
}

Main.propTypes = {
  loggedIn: PropTypes.bool,
};

Main.defaultProps = {
  loggedIn: false,
};
