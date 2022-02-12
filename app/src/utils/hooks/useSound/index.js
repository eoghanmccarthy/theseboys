import { useEffect, useRef } from 'react';
import { Channel, Destination } from 'tone';

import { getSynth, getEffect } from 'utils/toneHelpers';

const useSound = (channel, instrument, effects = {}) => {
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

  return synthRef.current;
};

export default useSound;
