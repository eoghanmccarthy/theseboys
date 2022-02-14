import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.css';

const Controller = memo(
  ({ children, id, orient = 'vertical', type = 'slider', theme = 'default' }) => {
    return (
      <div
        id={id}
        className={cx('controller', {
          [orient]: orient,
          [`type-${type}`]: type,
          [`theme-${theme}`]: theme
        })}
      >
        {children}
      </div>
    );
  }
);

export default Controller;

Controller.propTypes = {
  id: PropTypes.string.isRequired,
  orient: PropTypes.oneOf(['vertical', 'horizontal']),
  type: PropTypes.oneOf(['slider', 'button']),
  theme: PropTypes.oneOf(['default', 'light'])
};
