import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.css';

const Controller = ({ children, id, orient = 'vertical' }) => {
  return (
    <div id={id} className={cx('tb-controller', { [orient]: orient })}>
      {children}
    </div>
  );
};

export default Controller;
