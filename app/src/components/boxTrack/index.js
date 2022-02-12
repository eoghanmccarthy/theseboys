import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import useEventListener from 'utils/hooks/useEventListener';
import useSound from 'utils/hooks/useSound';

import { channelTypes, instrumentTypes, notesTypes } from '../../utils/types';

import Step from '../step';

const BoxTrack = memo(
  forwardRef(({ trackId, trackIndex, channel, instrument, notes, effects, controls }, ref) => {
    const noteInterval = `16n`;

    const sound = useSound(channel, instrument, effects);

    useEventListener(e => {
      if (parseInt(e.key) === trackIndex + 1) {
        handleTrigger(notes, noteInterval);
        document.querySelector(`button#${trackId}`).classList.add('hit');
      }
    });

    useEventListener(
      e => {
        if (parseInt(e.key) === trackIndex + 1) {
          document.querySelector(`button#${trackId}`).classList.remove('hit');
        }
      },
      document.body,
      'keyup'
    );

    const handleTrigger = (notesToPlay, ...rest) => {
      if (!sound) return;

      if (instrument?.synth !== 'NoiseSynth') {
        sound.triggerAttackRelease(notesToPlay[0], ...rest);
      } else {
        sound.triggerAttackRelease(...rest);
      }
    };

    return <Step id={trackId} onClick={() => handleTrigger(notes, noteInterval)} />;
  })
);

export default BoxTrack;

BoxTrack.propTypes = {
  trackId: PropTypes.string.isRequired,
  trackIndex: PropTypes.number,
  instrument: instrumentTypes,
  channel: channelTypes,
  notes: notesTypes,
  effects: PropTypes.object.isRequired
};
