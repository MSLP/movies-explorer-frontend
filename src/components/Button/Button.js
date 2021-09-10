import './Button.css';
import PropTypes from 'prop-types';

export default function Button({
  children, className, type, onClick,
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  children: '',
  onClick: () => {},
};
