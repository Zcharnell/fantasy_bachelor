import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

export default function NotificationBar(props) {
  const { isError, flyDown, value } = props;
  const notiClass = classNames({
    'notification-bar': true,
    error: isError,
    'fly-down': flyDown,
  });

  return (
    <div className={notiClass}>
      {value}
    </div>
  );
}

NotificationBar.propTypes = {
  value: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  flyDown: PropTypes.bool.isRequired,
};
