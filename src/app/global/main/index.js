import React from 'react';
import cx from 'classnames';

import './index.css';

const Main = ({ children, className }) => {
  return <main className={cx('me__main', className)}>{children}</main>;
};

export default Main;
