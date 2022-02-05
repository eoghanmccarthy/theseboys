import React, { memo, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Channel, Destination } from 'tone';

import { isArray } from 'utils/helpers/typeCheck';
import useEventListener from 'utils/hooks/useEventListener';

import { channelTypes, instrumentTypes, notesTypes } from '../../utils/types';

import { getSynth, getEffect } from 'utils/toneHelpers';

import Step from '../step';

const BeatTrack = memo(
  forwardRef(
    ({ trackId, trackNumber, color, channel, instrument, notes, effects, controls }, ref) => {
      const noteInterval = `16n`;

      useEventListener(e => {
        if (parseInt(e.key) === trackNumber) {
          handleTrigger(notes, noteInterval);
        }
      });

      /* Channel */
      const channelRef = useRef(new Channel(channel ?? {}));

      /* Effects */
      const effectsChainRef = useRef(
        Object.entries(effects ?? {}).map(([effect, options]) => getEffect(effect, options))
      );

      /* Synth */
      const synthRef = useRef(
        getSynth(instrument.synth, instrument.options).chain(
          channelRef.current,
          ...effectsChainRef.current,
          Destination
        )
      );

      useEffect(() => {
        return () => {
          if (Destination) {
            Destination.dispose();
          }

          if (channelRef.current) {
            channelRef.current.dispose();
          }

          if (synthRef.current) {
            synthRef.current.dispose();
          }

          if (isArray(effectsChainRef.current)) {
            effectsChainRef.current.forEach(effect => effect.dispose());
          }
        };
      }, []);

      const handleTrigger = (notesToPlay, ...rest) => {
        if (!synthRef.current) {
          return;
        }

        if (instrument?.synth !== 'NoiseSynth') {
          synthRef.current.triggerAttackRelease(notesToPlay[0], ...rest);
        } else {
          synthRef.current.triggerAttackRelease(...rest);
        }
      };

      return (
        <Step style={{ background: color }} onClick={() => handleTrigger(notes, noteInterval)} />
      );
    }
  )
);

export default BeatTrack;

BeatTrack.propTypes = {
  trackId: PropTypes.string.isRequired,
  trackNumber: PropTypes.number,
  instrument: instrumentTypes,
  channel: channelTypes,
  notes: notesTypes,
  effects: PropTypes.object.isRequired
};
