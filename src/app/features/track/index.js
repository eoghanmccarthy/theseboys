import React, { memo } from 'react';
import { string } from 'prop-types';
import cx from 'classnames';

import './styles.css';

const Track = memo(({ children, trackId }) => {
  return <div className={cx('Track', trackId)}>{children}</div>;
});

export default Track;

Track.propTypes = {
  trackId: string
};
