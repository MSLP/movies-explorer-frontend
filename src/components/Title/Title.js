import PropTypes from 'prop-types';
import './Title.css';

export default function Title({ children }) {
  return (
    <h2 className="title">{children}</h2>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

Title.defaultProps = {
  children: '',
};
