import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import useEventListener from 'utils/hooks/useEventListener';
import useSound from 'utils/hooks/useSound';

import { channelTypes, instrumentTypes, notesTypes } from '../../utils/types';

import Step from '../boxTrackStep';

const BoxTrack = memo(
  forwardRef(({ index, trackId, channel, instrument, notes, effects, controls }, ref) => {
    const noteInterval = `16n`;

    const { trigger } = useSound(channel, instrument, effects);

    useEventListener(e => {
      if (parseInt(e.key) === index + 1) {
        document.querySelector(`button#${trackId}`).classList.add('hit');
        handleTrigger();
      }
    });

    useEventListener(
      e => {
        if (parseInt(e.key) === index + 1) {
          document.querySelector(`button#${trackId}`).classList.remove('hit');
        }
      },
      document.body,
      'keyup'
    );

    const handleTrigger = () => {
      trigger(notes, noteInterval);
    };

    return <Step id={trackId} onClick={handleTrigger} />;
  })
);

export default BoxTrack;

BoxTrack.propTypes = {
  trackId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  instrument: instrumentTypes,
  channel: channelTypes,
  notes: notesTypes,
  effects: PropTypes.object.isRequired
};
