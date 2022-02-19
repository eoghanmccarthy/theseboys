import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Track = memo(
  forwardRef(({ children, trackId }, ref) => {
    return (
      <div id={trackId} data-trackid={trackId} className={'track'}>
        {children}
      </div>
    );
  })
);

export default Track;

Track.propTypes = {
  trackId: PropTypes.string.isRequired
};
