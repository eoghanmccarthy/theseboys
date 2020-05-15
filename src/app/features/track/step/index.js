import React from 'react';

import * as styles from './styles';

import TrackButton from 'features/track/trackButton';

const Step = ({ value, onClick }) => {
  return (
    <TrackButton
      css={styles.step({ value })}
      onClick={e => {
        e.preventDefault();
        let shiftEnabled = e.shiftKey === true;
        let val =
          value === 0
            ? shiftEnabled
              ? 2
              : 1
            : value === 1 && shiftEnabled
            ? 2
            : value === 2 && shiftEnabled
            ? 1
            : 0;

        onClick(val);
      }}
    />
  );
};

export default Step;
