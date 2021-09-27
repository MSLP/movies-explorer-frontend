import './Button.css';
import PropTypes from 'prop-types';

export default function Button({
  children, className, type, onClick, disabled,
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
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
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  children: '',
  onClick: () => {},
  disabled: false,
};
