import React from 'react';
import cx from 'classnames';

import './index.css';

const Main = ({ children, id, className }) => {
  return (
    <main id={id} className={cx('me__main', className)}>
      {children}
    </main>
  );
};

export default Main;
