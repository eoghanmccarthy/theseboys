import React, { memo, forwardRef, useImperativeHandle } from 'react';
import { string } from 'prop-types';

import './styles.css';

const Track = memo(
  forwardRef(({ children, trackId }, ref) => {
    useImperativeHandle(ref, () => ({
      save() {
        console.log(`Saving ${trackId}`);
      }
    }));

    return (
      <div id={trackId} className={'track'}>
        {children}
      </div>
    );
  })
);

export default Track;

Track.propTypes = {
  trackId: string
};
