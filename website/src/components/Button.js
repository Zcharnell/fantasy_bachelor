import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

export default function Button(props) {
  const {
    primaryText, onClick, linkTo, standalone,
  } = props;

  const buttonClass = classNames({
    button: true,
    'long-label': primaryText.length > 10,
    standalone,
  });

  if (linkTo) {
    return (
      <a href={linkTo} target="_blank">
        <div className={buttonClass}>
          {primaryText}
        </div>
      </a>
    );
  }
  return (
    <div onClick={onClick} className={buttonClass}>
      {primaryText}
    </div>
  );
}

Button.propTypes = {
  primaryText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  linkTo: PropTypes.string,
  standalone: PropTypes.bool,
};

Button.defaultProps = {
  onClick() {},
  linkTo: '',
  standalone: false,
};
