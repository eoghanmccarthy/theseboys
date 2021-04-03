import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.css';

const Controller = memo(({ children, id, orient = 'vertical' }) => {
  return (
    <div id={id} className={cx('controller', { [orient]: orient })}>
      {children}
    </div>
  );
});

export default Controller;
