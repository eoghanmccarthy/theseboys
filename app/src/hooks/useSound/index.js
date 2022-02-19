import { useEffect, useRef } from 'react';
import { Channel, Destination } from 'tone';

import { getSynth, getEffect } from 'utils/toneHelpers';

const useSound = (channel, instrument, effects = {}) => {
  if (!channel || !instrument || !effects) {
    throw new Error('error');
  }

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

  const trigger = (notes, ...rest) => {
    if (!synthRef.current) {
      return;
    }

    let args;

    switch (synthRef.current.name) {
      case 'NoiseSynth':
        args = [...rest];
        break;
      case 'PolySynth':
        args = [notes, ...rest];
        break;
      default:
        args = [notes[0], ...rest];
        break;
    }

    synthRef.current.triggerAttackRelease(...args);
  };

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

  return {
    channel: channelRef.current,
    synth: synthRef.current,
    effects: effectsChainRef.current,
    trigger
  };
};

export default useSound;
